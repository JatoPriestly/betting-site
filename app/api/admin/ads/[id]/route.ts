import { getAllAds, saveAds } from "@/app/lib/ads";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE } from "@/app/lib/adminSession";

async function isAuthorized() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value ?? "";
  return verifySessionToken(token);
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const ad = getAllAds().find(a => a.id === id);
  if (!ad) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(ad);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { id } = await params;
  const body = await req.json();
  let ads = getAllAds();
  
  const idx = ads.findIndex(a => a.id === id);
  if (idx === -1) return Response.json({ error: "Not found" }, { status: 404 });
  
  ads[idx] = { ...ads[idx], ...body };
  saveAds(ads);
  
  return Response.json(ads[idx]);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { id } = await params;
  let ads = getAllAds();
  ads = ads.filter(a => a.id !== id);
  saveAds(ads);
  
  return Response.json({ ok: true });
}
