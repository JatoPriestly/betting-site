import { createHmac, timingSafeEqual } from "crypto";

const SESSION_COOKIE = "admin_sess";
const SECRET = process.env.ADMIN_SESSION_SECRET ?? "changeme";

/** Sign a value with HMAC-SHA256. Returns "value.signature". */
function sign(value: string): string {
  const sig = createHmac("sha256", SECRET).update(value).digest("hex");
  return `${value}.${sig}`;
}

/** Verify and unsign. Returns the original value or null if tampered. */
function unsign(signed: string): string | null {
  const lastDot = signed.lastIndexOf(".");
  if (lastDot === -1) return null;
  const value = signed.slice(0, lastDot);
  const expected = Buffer.from(sign(value));
  const actual = Buffer.from(signed);
  if (expected.length !== actual.length) return null;
  try {
    if (!timingSafeEqual(expected, actual)) return null;
  } catch {
    return null;
  }
  return value;
}

/** Create a signed session token encoding expiry. */
export function createSessionToken(): string {
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 h
  return sign(`admin:${expiresAt}`);
}

/** Returns true if the signed cookie is valid and not expired. */
export function verifySessionToken(token: string): boolean {
  const value = unsign(token);
  if (!value) return false;
  const [prefix, expStr] = value.split(":");
  if (prefix !== "admin") return false;
  const exp = parseInt(expStr, 10);
  return !isNaN(exp) && Date.now() < exp;
}

export { SESSION_COOKIE };
