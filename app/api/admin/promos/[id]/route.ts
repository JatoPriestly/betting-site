import { getPromoById, savePromo, deletePromo } from "@/app/lib/promos";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

function isAuthorized(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.get("admin_auth")?.value === process.env.ADMIN_PIN;
}

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/admin/promos/[id]">
) {
  const cookieStore = await cookies();
  if (!isAuthorized(cookieStore)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const promo = getPromoById(id);
  if (!promo) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(promo);
}

export async function PUT(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/promos/[id]">
) {
  const cookieStore = await cookies();
  if (!isAuthorized(cookieStore)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const existing = getPromoById(id);
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });
  const body = await request.json();
  const updated = savePromo({ ...existing, ...body, id });
  return Response.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/admin/promos/[id]">
) {
  const cookieStore = await cookies();
  if (!isAuthorized(cookieStore)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const ok = deletePromo(id);
  if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ ok: true });
}
