import { getAllAds, saveAds, SystemAd } from "@/app/lib/ads";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE } from "@/app/lib/adminSession";

async function isAuthorized() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value ?? "";
  return verifySessionToken(token);
}

export async function GET() {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json(await getAllAds());
}

export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await req.json();
  const ads = await getAllAds();
  
  const newAd: SystemAd = {
    id: `ad-${Date.now()}`,
    title: body.title || "New Ad",
    description: body.description || "",
    badgeText: body.badgeText || "Notice",
    imageUrl: body.imageUrl || "/hero-coins.png",
    ctaText: body.ctaText || "Click Here",
    ctaUrl: body.ctaUrl || "#",
    delaySeconds: Number(body.delaySeconds) || 5,
    placement: body.placement || "global",
    active: !!body.active,
    createdAt: new Date().toISOString(),
  };
  
  ads.push(newAd);
  await saveAds(ads);
  
  return Response.json(newAd);
}

