/**
 * Fixed-window rate limit.
 * - Production: Upstash Redis over REST (works across serverless instances).
 *   Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
 * - Without those, an in-memory map is used. That is only reliable on a
 *   single instance, so isRateLimitDistributed() lets the handler refuse
 *   production traffic instead of silently under-limiting.
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

/** Accepts Upstash's own names or the KV_* names some Vercel integrations inject. */
function redisCreds() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

export function isRateLimitDistributed() {
  return redisCreds() !== null;
}

export async function hashKey(input: string) {
  const data = new TextEncoder().encode(`contact:${input}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

export async function checkRateLimit(key: string): Promise<{ allowed: boolean; retryAfter: number }> {
  const { max, windowSeconds } = rateLimitConfig();

  const creds = redisCreds();
  if (creds) {
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
