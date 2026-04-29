/**
 * footballApi.ts
 *
 * Wraps the RapidAPI football data endpoint with:
 *   - Cloudflare KV persistent cache (24 h for match-by-date, 60 s for live)
 *   - In-process hot cache as a read-through layer (avoids KV round-trip on
 *     the same server instance for repeat requests within the TTL)
 *   - Hard daily call budget: 7 API calls max per UTC day.
 *     When the budget is exhausted, stale cached data is served instead.
 */

import { kvGetJson, kvPutJson, dailyIncrement, dailyCount } from "./cfKv";

// ---------------------------------------------------------------------------
// In-process hot cache — survives only while the Node process is alive.
// Acts as a read-through layer in front of KV to avoid network hops.
// ---------------------------------------------------------------------------
interface HotEntry<T> {
  data: T;
  expiresAt: number;
}
const _hot = new Map<string, HotEntry<any>>();

function hotGet<T>(key: string): T | undefined {
  const e = _hot.get(key);
  if (e && e.expiresAt > Date.now()) return e.data as T;
  _hot.delete(key);
  return undefined;
}

function hotSet<T>(key: string, data: T, ttlMs: number): void {
  _hot.set(key, { data, expiresAt: Date.now() + ttlMs });
}

// ---------------------------------------------------------------------------
// API config
// ---------------------------------------------------------------------------
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST =
  process.env.RAPID_API_HOST || "free-api-live-football-data.p.rapidapi.com";
const BASE_URL = `https://${RAPID_API_HOST}`;

/** Daily call budget. Adjust here; the admin dashboard reads this constant. */
export const DAILY_CALL_BUDGET = 7;
const BUDGET_COUNTER_KEY = "sport-api-calls";

function apiHeaders() {
  return {
    "x-rapidapi-key": RAPID_API_KEY as string,
    "x-rapidapi-host": RAPID_API_HOST,
    Accept: "application/json",
  };
}

// ---------------------------------------------------------------------------
// Budget check
// ---------------------------------------------------------------------------
async function budgetAvailable(): Promise<boolean> {
  const used = await dailyCount(BUDGET_COUNTER_KEY);
  return used < DAILY_CALL_BUDGET;
}

/** Increment and return the new count. */
async function consumeBudget(): Promise<number> {
  return dailyIncrement(BUDGET_COUNTER_KEY);
}

// ---------------------------------------------------------------------------
// Single fetch — no retry (retrying burns rate limits).
// ---------------------------------------------------------------------------
async function apiFetch(url: string, timeoutMs = 8000): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: apiHeaders(),
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timer);
    if (res.status === 429) {
      console.warn(`[API] Rate limited on ${url}. Serving from cache.`);
      return null;
    }
    if (res.status === 503) {
      console.warn(`[API] 503 on ${url}.`);
      return null;
    }
    if (!res.ok) {
      console.error(`[API] ${res.status} on ${url}`);
      return null;
    }
    return res;
  } catch (err: any) {
    clearTimeout(timer);
    if (err.name === "AbortError") {
      console.warn(`[API] Timeout on ${url}`);
    } else {
      console.warn(`[API] Fetch error on ${url}:`, err?.message ?? err);
    }
    return null;
  }
}

// ---------------------------------------------------------------------------
// Generic cached fetch — hot cache → KV cache → API (if budget allows)
// ---------------------------------------------------------------------------
async function cachedFetch<T>(
  key: string,
  url: string,
  extractFn: (data: any) => T | null,
  hotTtlMs: number,
  kvTtlSeconds: number
): Promise<T | null> {
  // 1. In-process hot cache
  const hot = hotGet<T>(key);
  if (hot !== undefined) return hot;

  // 2. KV cache
  const kv = await kvGetJson<T>(key);
  if (kv !== null) {
    hotSet(key, kv, hotTtlMs);
    return kv;
  }

  // 3. Budget check
  if (!RAPID_API_KEY) return null;
  const ok = await budgetAvailable();
  if (!ok) {
    const used = await dailyCount(BUDGET_COUNTER_KEY);
    console.warn(
      `[API] Daily budget exhausted (${used}/${DAILY_CALL_BUDGET}). Serving stale or empty.`
    );
    return null;
  }

  // 4. Live API call
  await consumeBudget();
  const res = await apiFetch(url);
  if (!res) return null;

  try {
    const data = await res.json();
    const extracted = extractFn(data);
    if (extracted !== null) {
      await kvPutJson(key, extracted, kvTtlSeconds);
      hotSet(key, extracted, hotTtlMs);
      return extracted;
    }
  } catch (e) {
    console.error(`[API] Failed to parse JSON for ${key}:`, e);
  }
  return null;
}

// ---------------------------------------------------------------------------
// Extractors
// ---------------------------------------------------------------------------
function extractMatches(data: any): any[] | null {
  const matches =
    (Array.isArray(data) && data) ||
    data?.response?.live ||
    data?.response?.matches ||
    data?.response ||
    data?.data?.live ||
    data?.data?.matches ||
    data?.data ||
    null;
  return Array.isArray(matches) ? matches : null;
}

function extractLeagues(data: any): any[] | null {
  const items =
    data?.response?.leagues ||
    data?.data?.leagues ||
    data?.leagues ||
    null;
  if (!Array.isArray(items)) return null;
  return items;
}

// ---------------------------------------------------------------------------
// getLiveMatches — KV TTL: 60 s, hot TTL: 30 s
// ---------------------------------------------------------------------------
export async function getLiveMatches(lang = "en"): Promise<any[]> {
  const key = `live-matches:${lang}`;
  const result = await cachedFetch(
    key,
    `${BASE_URL}/football-current-live?lang=${lang}`,
    extractMatches,
    30_000,        // hot cache 30 s
    60             // KV TTL 60 s
  );
  return result ?? [];
}

// ---------------------------------------------------------------------------
// getMatchesByDate — KV TTL: 24 h (86400 s), hot TTL: 5 min
// This is the main cache target: one call per date, persisted in CF KV.
// ---------------------------------------------------------------------------
export async function getMatchesByDate(date: string, lang = "en"): Promise<any[]> {
  const key = `matches-by-date:${date}:${lang}`;
  const result = await cachedFetch(
    key,
    `${BASE_URL}/football-get-matches-by-date?date=${date}&lang=${lang}`,
    extractMatches,
    5 * 60_000,    // hot cache 5 min
    86_400         // KV TTL 24 h
  );
  return result ?? [];
}

// ---------------------------------------------------------------------------
// getAllLeagues — KV TTL: 24 h, hot TTL: 1 h
// Fires two requests (counts as 2 towards daily budget).
// ---------------------------------------------------------------------------
export async function getAllLeagues(lang = "en"): Promise<any[]> {
  const key = `all-leagues:${lang}`;

  // 1. Hot cache
  const hot = hotGet<any[]>(key);
  if (hot !== undefined) return hot;

  // 2. KV cache
  const kv = await kvGetJson<any[]>(key);
  if (kv !== null) {
    hotSet(key, kv, 60 * 60_000);
    return kv;
  }

  // 3. Budget check — this costs 2 calls
  if (!RAPID_API_KEY) return [];
  const used = await dailyCount(BUDGET_COUNTER_KEY);
  if (used + 2 > DAILY_CALL_BUDGET) {
    console.warn(`[API] Insufficient budget for getAllLeagues (need 2, have ${DAILY_CALL_BUDGET - used}).`);
    return [];
  }

  await consumeBudget(); // call 1
  await consumeBudget(); // call 2

  const [standardRes, countriesRes] = await Promise.all([
    apiFetch(`${BASE_URL}/football-get-all-leagues?lang=${lang}`),
    apiFetch(`${BASE_URL}/football-get-all-leagues-with-countries?lang=${lang}`),
  ]);

  const leagueMap = new Map<number, any>();
  const allLeagues: any[] = [];

  const addLeague = (l: any) => {
    if (l?.id != null && !leagueMap.has(l.id)) {
      leagueMap.set(l.id, l);
      allLeagues.push(l);
    }
  };

  if (standardRes) {
    try {
      const data = await standardRes.json();
      const leagues = extractLeagues(data) ?? [];
      leagues.forEach(addLeague);
    } catch {}
  }

  if (countriesRes) {
    try {
      const data = await countriesRes.json();
      const countries = extractLeagues(data) ?? [];
      countries.forEach((country: any) => {
        if (Array.isArray(country.leagues)) country.leagues.forEach(addLeague);
      });
    } catch {}
  }

  if (allLeagues.length > 0) {
    await kvPutJson(key, allLeagues, 86_400); // 24 h
    hotSet(key, allLeagues, 60 * 60_000);    // 1 h hot
  }
  return allLeagues;
}

// ---------------------------------------------------------------------------
// Admin helper: expose today's usage stats
// ---------------------------------------------------------------------------
export async function getApiUsageStats(): Promise<{
  used: number;
  budget: number;
  remaining: number;
}> {
  const used = await dailyCount(BUDGET_COUNTER_KEY);
  return {
    used,
    budget: DAILY_CALL_BUDGET,
    remaining: Math.max(0, DAILY_CALL_BUDGET - used),
  };
}
