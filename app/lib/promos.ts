import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "promos.json");

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

function readPromos(): PromoCode[] {
  const raw = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(raw) as PromoCode[];
}

function writePromos(promos: PromoCode[]): void {
  fs.writeFileSync(dataFilePath, JSON.stringify(promos, null, 2), "utf-8");
}

export function getAllPromos(): PromoCode[] {
  return readPromos().sort((a, b) => a.rank - b.rank);
}

export function getActivePromos(): PromoCode[] {
  return getAllPromos().filter((p) => p.active);
}

export function getPromoById(id: string): PromoCode | undefined {
  return readPromos().find((p) => p.id === id);
}

export function savePromo(promo: PromoCode): PromoCode {
  const promos = readPromos();
  const idx = promos.findIndex((p) => p.id === promo.id);
  if (idx >= 0) {
    promos[idx] = promo;
  } else {
    promos.push(promo);
  }
  writePromos(promos);
  return promo;
}

export function deletePromo(id: string): boolean {
  const promos = readPromos();
  const filtered = promos.filter((p) => p.id !== id);
  if (filtered.length === promos.length) return false;
  writePromos(filtered);
  return true;
}
