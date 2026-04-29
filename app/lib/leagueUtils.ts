import leagueRegistry from "./leagueRegistry.json";

export const COMMON_LEAGUES: Record<number, { name: string; logo: string }> = {
  47: { name: "Premier League", logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/47.png" },
  53: { name: "Ligue 1", logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/53.png" },
  54: { name: "Bundesliga", logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/54.png" },
  55: { name: "Serie A", logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/55.png" },
  87: { name: "La Liga", logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/87.png" },
  42: { name: "Champions League", logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/42.png" },
  73: { name: "Europa League", logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/73.png" },
  77: { name: "World Cup", logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/77.png" },
  132: { name: "FA Cup", logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/132.png" },
  50: { name: "MLS", logo: "https://images.fotmob.com/image_resources/logo/leaguelogo/dark/50.png" },
  908818: { name: "FIFA", logo: "" }, // Add problematic ID from test
  901954: { name: "A-League", logo: "" },
  918271: { name: "J3 League", logo: "" },
  918272: { name: "JFL", logo: "" },
  922584: { name: "K3 League", logo: "" },
  919356: { name: "K League 1", logo: "" },
  920066: { name: "K League 2", logo: "" },
  9500: { name: "WE League", logo: "" },
};

export function getLeagueMetadata(id: number, apiMetadata: any) {
  // 1. Check API metadata first
  if (apiMetadata && apiMetadata[id]) {
    return apiMetadata[id];
  }
  
  // 2. Fallback to our generated local registry
  const registryObj = (leagueRegistry as any)[id.toString()];
  if (registryObj) {
    return registryObj;
  }
  
  // 3. Fallback to hardcoded common leagues mapping
  if (COMMON_LEAGUES[id]) {
    return COMMON_LEAGUES[id];
  }
  
  return null;
}

export function cleanLeagueName(name: string): string {
  if (!name) return name;
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes("fifa")) return "FIFA";
  if (lowerName.includes("world cup") && !lowerName.includes("club")) return "FIFA World Cup";
  if (lowerName.includes("champions league")) return "Champions League";
  if (lowerName.includes("europa league")) return "Europa League";
  if (lowerName.includes("premier league")) return "Premier League";
  if (lowerName.includes("la liga") || lowerName.includes("primera division")) return "La Liga";
  if (lowerName.includes("bundesliga")) return "Bundesliga";
  if (lowerName.includes("serie a")) return "Serie A";
  if (lowerName.includes("ligue 1")) return "Ligue 1";
  
  return name;
}
