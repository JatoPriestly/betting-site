/**
 * In-memory rate limiter.
 * Tracks failed login attempts per IP and blocks after too many failures.
 * Data lives in the Node.js process — resets on server restart.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

const buckets = new Map<string, Bucket>();

function getBucket(ip: string): Bucket {
  const now = Date.now();
  let b = buckets.get(ip);
  if (!b || b.resetAt < now) {
    b = { count: 0, resetAt: now + WINDOW_MS };
    buckets.set(ip, b);
  }
  return b;
}

/** Returns true if the IP is currently rate-limited. */
export function isRateLimited(ip: string): boolean {
  return getBucket(ip).count >= MAX_ATTEMPTS;
}

/** Record a failed attempt. Returns remaining attempts before lockout. */
export function recordFailure(ip: string): number {
  const b = getBucket(ip);
  b.count = Math.min(b.count + 1, MAX_ATTEMPTS);
  return Math.max(0, MAX_ATTEMPTS - b.count);
}

/** Reset the counter after a successful login. */
export function resetAttempts(ip: string): void {
  buckets.delete(ip);
}

/** Seconds until the window resets (for showing to the user). */
export function retryAfterSeconds(ip: string): number {
  const b = buckets.get(ip);
  if (!b) return 0;
  return Math.ceil((b.resetAt - Date.now()) / 1000);
}
