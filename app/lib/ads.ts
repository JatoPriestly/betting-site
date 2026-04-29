import fs from "fs";
import path from "path";

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

const dataFilePath = path.join(process.cwd(), "data", "ads.json");

function ensureFile() {
  if (!fs.existsSync(dataFilePath)) {
    fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    // Default seed with the TouchPoint ad
    const defaultAds: SystemAd[] = [
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
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultAds, null, 2));
  }
}

export function getAllAds(): SystemAd[] {
  ensureFile();
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data) as SystemAd[];
}

export function getActiveAds(): SystemAd[] {
  return getAllAds().filter((ad) => ad.active);
}

export function saveAds(ads: SystemAd[]) {
  ensureFile();
  fs.writeFileSync(dataFilePath, JSON.stringify(ads, null, 2));
}

export function getAdById(id: string): SystemAd | null {
  return getAllAds().find((a) => a.id === id) || null;
}
