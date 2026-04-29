import { getAllPromos, savePromo, deletePromo } from "@/app/lib/promos";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/app/lib/adminSession";

async function isAuthorized() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value ?? "");
}

export async function GET() {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json(await getAllPromos());
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorized())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  if (!body.bookmaker || !body.promoCode) {
    return Response.json(
      { error: "Bookmaker and promo code are required" },
      { status: 400 }
    );
  }
  const promo = await savePromo({
    id: Date.now().toString(),
    rank: body.rank || 99,
    bookmaker: body.bookmaker,
    logoText: body.logoText || body.bookmaker,
    logoColor: body.logoColor || "#7c3aed",
    logoUrl: body.logoUrl || "",
    promoCode: body.promoCode,
    bonusAmount: body.bonusAmount || "",
    bonusLabel: body.bonusLabel || "Bonus up to",
    rating: body.rating || 8.0,
    category: body.category || "Welcome Bonus",
    affiliateUrl: body.affiliateUrl || "#",
    description: body.description || "",
    termsText: body.termsText || "T&Cs apply. 18+.",
    validUntil: body.validUntil || "",
    verified: body.verified ?? true,
    exclusive: body.exclusive ?? false,
    tags: body.tags || [],
    active: body.active ?? true,
  });
  return Response.json(promo, { status: 201 });
}

