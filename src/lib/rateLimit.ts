/**
 * rateLimit.ts
 * Simple in-memory IP-based rate limiter for Next.js API routes.
 *
 * Designed so the in-memory Map can be swapped for Upstash Redis / Vercel KV
 * later by replacing the `store` Map with an async KV client.
 *
 * NOTE: In-memory state is per-worker-process. On multi-instance deployments
 * (e.g., multi-region Vercel) this provides per-instance limiting only.
 * Replace with Redis for true distributed rate limiting.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number; // Unix ms timestamp
}

// Global in-memory store — keyed by `${ip}:${key}`
const store = new Map<string, RateLimitEntry>();

// Periodically sweep expired entries (every 5 minutes) to prevent memory growth
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of store.entries()) {
      if (v.resetAt < now) store.delete(k);
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Check whether the given IP is within the allowed rate for a named bucket.
 *
 * @param ip            - Client IP address (from x-forwarded-for or request)
 * @param key           - Bucket name (e.g. "applications", "lookup")
 * @param maxRequests   - Maximum requests allowed in the window
 * @param windowMs      - Window duration in milliseconds
 */
export function checkRateLimit(
  ip: string,
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const storeKey = `${ip}:${key}`;
  const now = Date.now();

  const entry = store.get(storeKey);

  // Window expired or first request — reset
  if (!entry || entry.resetAt < now) {
    store.set(storeKey, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, retryAfterSeconds: 0 };
  }

  if (entry.count >= maxRequests) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    retryAfterSeconds: 0,
  };
}

/**
 * Extract the best-available client IP from a NextRequest or Request.
 * Falls back to "unknown" if headers are not present.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "unknown";
}
