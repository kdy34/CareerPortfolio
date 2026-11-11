import { LIMITS, validateContact, type ContactInput } from "./contact";
import { contactAvailability, sendContactEmail } from "./email";
import { checkRateLimit, hashKey, isRateLimitDistributed } from "./rate-limit";

/**
 * Framework-independent handler (standard Request/Response) so it can be
 * unit-tested without Next.js. app/api/contact/route.ts re-exports it.
 */
export interface ContactDeps {
  send: (input: ContactInput) => Promise<{ ok: boolean; status: number }>;
}

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });

export async function handleContact(req: Request, deps: ContactDeps = { send: sendContactEmail }) {
  const mode = contactAvailability();
  if (mode === "unavailable") return json({ ok: false, error: "unavailable" }, 503);
  if (mode === "live" && process.env.NODE_ENV === "production" && !isRateLimitDistributed()) {
    // Refuse rather than run with a per-instance limit in multi-instance production.
    console.error("[contact] rate limit store not configured");
    return json({ ok: false, error: "unavailable" }, 503);
  }

  if (!(req.headers.get("content-type") ?? "").includes("application/json")) {
    return json({ ok: false, error: "unsupported_media_type" }, 415);
  }
  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > LIMITS.bodyBytes) return json({ ok: false, error: "too_large" }, 413);

  const raw = await req.text();
  if (new TextEncoder().encode(raw).length > LIMITS.bodyBytes) return json({ ok: false, error: "too_large" }, 413);

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "invalid_json" }, 400);
  }

  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (typeof body.company === "string" && body.company.trim() !== "") return json({ ok: true });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  try {
    const { allowed, retryAfter } = await checkRateLimit(await hashKey(ip));
    if (!allowed) return json({ ok: false, error: "rate_limited" }, 429, { "Retry-After": String(retryAfter) });
  } catch (e) {
    console.error("[contact] rate limit check failed", (e as Error).message);
    return json({ ok: false, error: "unavailable" }, 503);
  }

  const result = validateContact(body);
  if (!result.ok) return json({ ok: false, error: "invalid", fields: result.errors }, 422);

  if (mode === "mock") return json({ ok: true, mock: true });

  try {
    const sent = await deps.send(result.data);
    if (!sent.ok) {
      console.error("[contact] provider rejected message", sent.status); // no message body or secrets logged
      return json({ ok: false, error: "provider_error" }, 502);
    }
  } catch (e) {
    console.error("[contact] provider request failed", (e as Error).name);
    return json({ ok: false, error: "provider_error" }, 502);
  }
  return json({ ok: true });
}
