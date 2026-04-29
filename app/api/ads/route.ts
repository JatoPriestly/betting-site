import { getActiveAds } from "@/app/lib/ads";

export async function GET() {
  return Response.json(await getActiveAds());
}

