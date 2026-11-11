import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { handleContact } from "../lib/contact-handler";
import { __resetMemoryRateLimit } from "../lib/rate-limit";

const ok = { name: "Test Person", email: "test@example.com", message: "Hello, this is a test message long enough." };
const req = (body: unknown, headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.7", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
const env = process.env as Record<string, string | undefined>;
const live = () => Object.assign(env, { CONTACT_PROVIDER: "ses", CONTACT_FROM_EMAIL: "a@x.dev", CONTACT_TO_EMAIL: "b@x.dev", CONTACT_DEV_MOCK: "false", NODE_ENV: "test" });

beforeEach(() => {
  __resetMemoryRateLimit();
  for (const k of ["CONTACT_PROVIDER", "RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL", "CONTACT_DEV_MOCK", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "KV_REST_API_URL", "KV_REST_API_TOKEN", "RATE_LIMIT_TABLE"]) delete env[k];
  env.NODE_ENV = "test";
});

test("unconfigured -> 503 unavailable", async () => {
  const r = await handleContact(req(ok));
  assert.equal(r.status, 503);
});

test("dev mock accepts without sending", async () => {
  env.CONTACT_DEV_MOCK = "true";
  let sent = false;
  const r = await handleContact(req(ok), { send: async () => ((sent = true), { ok: true, status: 200 }) });
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true, mock: true });
  assert.equal(sent, false);
});

test("dev mock is ignored in production", async () => {
  env.CONTACT_DEV_MOCK = "true";
  env.NODE_ENV = "production";
  assert.equal((await handleContact(req(ok))).status, 503);
});

test("invalid input -> 422 with field errors", async () => {
  live();
  const r = await handleContact(req({ ...ok, email: "nope", message: "short" }), { send: async () => ({ ok: true, status: 200 }) });
  assert.equal(r.status, 422);
  const j = await r.json();
  assert.ok(j.fields.email && j.fields.message);
});

test("oversized body -> 413", async () => {
  live();
  const r = await handleContact(req({ ...ok, message: "x".repeat(9000) }));
  assert.equal(r.status, 413);
});

test("wrong content type -> 415, bad JSON -> 400", async () => {
  live();
  assert.equal((await handleContact(req(ok, { "content-type": "text/plain" }))).status, 415);
  assert.equal((await handleContact(req("{not json"))).status, 400);
});

test("honeypot pretends success and does not send", async () => {
  live();
  let sent = false;
  const r = await handleContact(req({ ...ok, company: "bot inc" }), { send: async () => ((sent = true), { ok: true, status: 200 }) });
  assert.equal(r.status, 200);
  assert.equal(sent, false);
});

test("success sends once with validated data", async () => {
  live();
  const calls: unknown[] = [];
  const r = await handleContact(req(ok), { send: async (d) => (calls.push(d), { ok: true, status: 200 }) });
  assert.equal(r.status, 200);
  assert.equal(calls.length, 1);
});

test("provider failure -> 502", async () => {
  live();
  const r = await handleContact(req(ok), { send: async () => ({ ok: false, status: 500 }) });
  assert.equal(r.status, 502);
  const r2 = await handleContact(req(ok, { "x-forwarded-for": "198.51.100.2" }), { send: async () => { throw new Error("network"); } });
  assert.equal(r2.status, 502);
});

test("rate limit -> 429 after max", async () => {
  live();
  env.CONTACT_RATE_LIMIT_MAX = "2";
  const send = async () => ({ ok: true, status: 200 });
  assert.equal((await handleContact(req(ok), { send })).status, 200);
  assert.equal((await handleContact(req(ok), { send })).status, 200);
  const r = await handleContact(req(ok), { send });
  assert.equal(r.status, 429);
  assert.ok(r.headers.get("retry-after"));
  delete env.CONTACT_RATE_LIMIT_MAX;
});

test("production live without distributed rate limit -> 503", async () => {
  live();
  env.NODE_ENV = "production";
  assert.equal((await handleContact(req(ok), { send: async () => ({ ok: true, status: 200 }) })).status, 503);
});

test("email builder keeps user text out of headers", async () => {
  const { buildEmail } = await import("../lib/email");
  const e = buildEmail({ ...ok, name: "Eve\r\nBcc: x@y.z" } as never);
  assert.ok(!/[\r\n]/.test(e.subject));
});

test("resend provider needs an API key; ses does not", async () => {
  const { isEmailConfigured } = await import("../lib/email");
  Object.assign(env, { CONTACT_FROM_EMAIL: "a@x.dev", CONTACT_TO_EMAIL: "b@x.dev", CONTACT_PROVIDER: "ses" });
  assert.equal(isEmailConfigured(), true);
  env.CONTACT_PROVIDER = "resend";
  assert.equal(isEmailConfigured(), false);
  env.RESEND_API_KEY = "k";
  assert.equal(isEmailConfigured(), true);
  delete env.RESEND_API_KEY;
});

test("a DynamoDB table counts as a distributed rate limit", async () => {
  const { isRateLimitDistributed } = await import("../lib/rate-limit");
  assert.equal(isRateLimitDistributed(), false);
  env.RATE_LIMIT_TABLE = "portfolio-contact-rate-limit";
  assert.equal(isRateLimitDistributed(), true);
});
