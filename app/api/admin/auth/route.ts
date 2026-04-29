import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import {
  createSessionToken,
  SESSION_COOKIE,
} from "@/app/lib/adminSession";
import {
  isRateLimited,
  recordFailure,
  resetAttempts,
  retryAfterSeconds,
} from "@/app/lib/rateLimiter";

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const ip = getIp(request);

  // Rate limit check
  if (isRateLimited(ip)) {
    const retryAfter = retryAfterSeconds(ip);
    return Response.json(
      { error: `Too many attempts. Try again in ${retryAfter}s.` },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  let pin: string;
  try {
    ({ pin } = await request.json());
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const adminPin = process.env.ADMIN_PIN ?? "";

  // Constant-time comparison to prevent timing attacks
  const match =
    pin.length === adminPin.length &&
    timingSafeEqual(Buffer.from(pin), Buffer.from(adminPin));

  if (!match) {
    const remaining = recordFailure(ip);
    return Response.json(
      {
        error: "Incorrect PIN.",
        remaining,
      },
      { status: 401 }
    );
  }

  // Success — reset counter and set signed session cookie
  resetAttempts(ip);
  const token = createSessionToken();

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 h
    path: "/",
  });

  return Response.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return Response.json({ ok: true });
}
