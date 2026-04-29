import { kvGetJson, kvPutJson } from "./cfKv";

export interface SystemAd {
  id: string;
  title: string;
  description: string;
  badgeText: string;
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
  delaySeconds: number;
  placement: "global" | "home" | "promos" | "blog" | "sports";
  active: boolean;
  createdAt: string;
}

const KV_KEY_ADS = "system_ads";

const DEFAULT_ADS: SystemAd[] = [
  {
    id: "touchpoint-vip-1",
    title: "Fast Track Your <span>TouchPoint</span> Payouts",
    description: "Don't wait in line. Connect directly with our admin on WhatsApp for priority processing on large withdrawals and instant account top-ups.",
    badgeText: "VIP Access",
    imageUrl: "/hero-coins.png",
    ctaText: "Contact Admin",
    ctaUrl: "https://wa.me/237654720955?text=Hello%21%20I%20need%20information%20regarding%20TouchPoint%20payouts%20and%20top-ups.",
    delaySeconds: 10,
    placement: "global",
    active: true,
    createdAt: new Date().toISOString(),
  }
];

export async function getAllAds(): Promise<SystemAd[]> {
  const ads = await kvGetJson<SystemAd[]>(KV_KEY_ADS);
  if (!ads) {
    // Seed KV if empty
    await kvPutJson(KV_KEY_ADS, DEFAULT_ADS, 3600 * 24 * 365); // 1 year
    return DEFAULT_ADS;
  }
  return ads;
}

export async function getActiveAds(): Promise<SystemAd[]> {
  const ads = await getAllAds();
  return ads.filter((ad) => ad.active);
}

export async function saveAds(ads: SystemAd[]): Promise<void> {
  await kvPutJson(KV_KEY_ADS, ads, 3600 * 24 * 365);
}

export async function getAdById(id: string): Promise<SystemAd | null> {
  const ads = await getAllAds();
  return ads.find((a) => a.id === id) || null;
}

