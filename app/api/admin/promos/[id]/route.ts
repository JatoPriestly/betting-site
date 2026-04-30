import { getPromoById, savePromo, deletePromo } from "@/app/lib/promos";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/app/lib/adminSession";
import { revalidatePath } from "next/cache";

async function isAuthorized() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value ?? "");
}

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/admin/promos/[id]">
) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const promo = await getPromoById(id);
  if (!promo) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(promo);
}

export async function PUT(
  request: NextRequest,
  ctx: RouteContext<"/api/admin/promos/[id]">
) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const existing = await getPromoById(id);
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });
  const body = await request.json();
  const updated = await savePromo({ ...existing, ...body, id });
  revalidatePath("/[lang]/promos", "page");
  revalidatePath("/", "page");
  return Response.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  ctx: RouteContext<"/api/admin/promos/[id]">
) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const ok = await deletePromo(id);
  if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/[lang]/promos", "page");
  revalidatePath("/", "page");
  return Response.json({ ok: true });
}

