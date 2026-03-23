import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { pin } = await request.json();

  if (pin !== process.env.ADMIN_PIN) {
    return Response.json({ error: "Invalid PIN" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_auth", process.env.ADMIN_PIN as string, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  return Response.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
  return Response.json({ ok: true });
}
