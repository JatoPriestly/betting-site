import { kvGetJson, kvPutJson } from "./cfKv";

const KV_KEY_PROMOS = "system_promos";

export interface PromoCode {
  id: string;
  rank: number;
  bookmaker: string;
  logoText: string;
  logoColor: string;
  logoUrl?: string;
  promoCode: string;
  bonusAmount: string;
  bonusLabel: string;
  rating: number;
  category: string;
  affiliateUrl: string;
  description: string;
  termsText: string;
  validUntil: string;
  verified: boolean;
  exclusive: boolean;
  tags: string[];
  active: boolean;
}

async function readPromos(): Promise<PromoCode[]> {
  const promos = await kvGetJson<PromoCode[]>(KV_KEY_PROMOS);
  return promos || [];
}

async function writePromos(promos: PromoCode[]): Promise<void> {
  await kvPutJson(KV_KEY_PROMOS, promos, 3600 * 24 * 365);
}

export async function getAllPromos(): Promise<PromoCode[]> {
  const promos = await readPromos();
  return promos.sort((a, b) => a.rank - b.rank);
}

export async function getActivePromos(): Promise<PromoCode[]> {
  const promos = await getAllPromos();
  return promos.filter((p) => p.active);
}

export async function getPromoById(id: string): Promise<PromoCode | undefined> {
  const promos = await readPromos();
  return promos.find((p) => p.id === id);
}

export async function savePromo(promo: PromoCode): Promise<PromoCode> {
  const promos = await readPromos();
  const idx = promos.findIndex((p) => p.id === promo.id);
  if (idx >= 0) {
    promos[idx] = promo;
  } else {
    promos.push(promo);
  }
  await writePromos(promos);
  return promo;
}

export async function deletePromo(id: string): Promise<boolean> {
  const promos = await readPromos();
  const filtered = promos.filter((p) => p.id !== id);
  if (filtered.length === promos.length) return false;
  await writePromos(filtered);
  return true;
}

