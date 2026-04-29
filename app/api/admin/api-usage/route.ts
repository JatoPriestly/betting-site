import { getApiUsageStats } from "@/app/lib/footballApi";
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
  const stats = await getApiUsageStats();
  return Response.json(stats);
}
