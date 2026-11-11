/**
 * Fixed-window rate limit for the contact form.
 * - AWS: DynamoDB table (set RATE_LIMIT_TABLE). Partition key "pk" (String),
 *   TTL attribute "expiresAt". Works across all server instances.
 * - Alternative: Upstash Redis REST (UPSTASH_REDIS_REST_URL / _TOKEN).
 * - Neither: in-memory map, only reliable on one instance, so production
 *   refuses traffic instead (see contact-handler).
 */

const memory = new Map<string, { count: number; resetAt: number }>();

export function rateLimitConfig() {
  const max = Number(process.env.CONTACT_RATE_LIMIT_MAX ?? 5);
  const windowSeconds = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS ?? 600);
  return {
    max: Number.isFinite(max) && max > 0 ? max : 5,
    windowSeconds: Number.isFinite(windowSeconds) && windowSeconds > 0 ? windowSeconds : 600,
  };
}

function redisCreds() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function isRateLimitDistributed() {
  return Boolean(process.env.RATE_LIMIT_TABLE) || redisCreds() !== null;
}

export async function hashKey(input: string) {
  const data = new TextEncoder().encode(`contact:${input}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ddbClient: any;

async function checkDynamo(key: string, max: number, windowSeconds: number) {
  const { DynamoDBClient, UpdateItemCommand } = await import("@aws-sdk/client-dynamodb");
  ddbClient ??= new DynamoDBClient({ region: process.env.CONTACT_AWS_REGION || process.env.AWS_REGION || "us-east-1" });
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - (now % windowSeconds);
  const res = await ddbClient.send(
    new UpdateItemCommand({
      TableName: process.env.RATE_LIMIT_TABLE,
      Key: { pk: { S: `${key}#${windowStart}` } },
      UpdateExpression: "ADD #c :one SET #e = if_not_exists(#e, :exp)",
      ExpressionAttributeNames: { "#c": "count", "#e": "expiresAt" },
      ExpressionAttributeValues: { ":one": { N: "1" }, ":exp": { N: String(windowStart + windowSeconds + 60) } },
      ReturnValues: "UPDATED_NEW",
    }),
  );
  const count = Number(res.Attributes?.count?.N ?? 1);
  return { allowed: count <= max, retryAfter: Math.max(windowStart + windowSeconds - now, 1) };
}

async function checkRedis(creds: { url: string; token: string }, key: string, max: number, windowSeconds: number) {
  const res = await fetch(`${creds.url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${creds.token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", `rl:${key}`],
      ["EXPIRE", `rl:${key}`, String(windowSeconds), "NX"],
      ["TTL", `rl:${key}`],
    ]),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`rate-limit store responded ${res.status}`);
  const [incr, , ttl] = (await res.json()) as { result: number }[];
  return { allowed: incr.result <= max, retryAfter: Math.max(ttl.result, 1) };
}

export async function checkRateLimit(key: string): Promise<{ allowed: boolean; retryAfter: number }> {
  const { max, windowSeconds } = rateLimitConfig();
  if (process.env.RATE_LIMIT_TABLE) return checkDynamo(key, max, windowSeconds);
  const creds = redisCreds();
  if (creds) return checkRedis(creds, key, max, windowSeconds);

  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return { allowed: true, retryAfter: windowSeconds };
  }
  entry.count += 1;
  return { allowed: entry.count <= max, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
}

/** Test helper. */
export function __resetMemoryRateLimit() {
  memory.clear();
}
