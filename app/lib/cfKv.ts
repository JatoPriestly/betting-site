/**
 * Cloudflare KV REST API wrapper.
 *
 * Set these env vars to enable CF KV:
 *   CF_ACCOUNT_ID      - Cloudflare account ID
 *   CF_KV_NAMESPACE_ID - KV namespace ID
 *   CF_KV_API_TOKEN    - API token with KV:Edit permission
 *
 * Without them the module falls back to an in-process Map (dev / local).
 */

const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const NAMESPACE_ID = process.env.CF_KV_NAMESPACE_ID;
const API_TOKEN = process.env.CF_KV_API_TOKEN;

const CF_ENABLED = !!(ACCOUNT_ID && NAMESPACE_ID && API_TOKEN);

const BASE = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}`;

// Local fallback is disabled in non-Node environments (Edge)
function localGet(key: string): string | null {
  return null;
}

function localPut(key: string, value: string, ttlSeconds: number): void {
  // No-op in Edge
}

function localDelete(key: string): void {
  // No-op in Edge
}


// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Read a string value from KV. Returns null if missing or expired. */
export async function kvGet(key: string): Promise<string | null> {
  if (!CF_ENABLED) return localGet(key);
  try {
    const res = await fetch(`${BASE}/values/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      console.warn(`[KV] GET ${key} failed: ${res.status}`);
      return localGet(key); // degrade to local
    }
    return await res.text();
  } catch (err: any) {
    console.warn("[KV] GET error:", err?.message);
    return localGet(key);
  }
}

/** Write a string value with a TTL in seconds (max 604800 = 7 days). */
export async function kvPut(
  key: string,
  value: string,
  ttlSeconds: number
): Promise<void> {
  // Always update local so subsequent in-process reads are fast.
  localPut(key, value, ttlSeconds);

  if (!CF_ENABLED) return;
  try {
    const url = new URL(`${BASE}/values/${encodeURIComponent(key)}`);
    if (ttlSeconds > 0) {
      url.searchParams.set("expiration_ttl", String(ttlSeconds));
    }

    const res = await fetch(url.toString(), {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "text/plain",
      },
      body: value,
    });
    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[KV] PUT ${key} failed: ${res.status} - ${errText}`);
    }
  } catch (err: any) {
    console.warn("[KV] PUT error:", err?.message);
  }
}

/** Delete a key. */
export async function kvDelete(key: string): Promise<void> {
  localDelete(key);
  if (!CF_ENABLED) return;
  try {
    await fetch(`${BASE}/values/${encodeURIComponent(key)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    });
  } catch (err: any) {
    console.warn("[KV] DELETE error:", err?.message);
  }
}

// ---------------------------------------------------------------------------
// JSON helpers
// ---------------------------------------------------------------------------
export async function kvGetJson<T>(key: string): Promise<T | null> {
  const raw = await kvGet(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function kvPutJson<T>(
  key: string,
  value: T,
  ttlSeconds: number
): Promise<void> {
  await kvPut(key, JSON.stringify(value), ttlSeconds);
}

// ---------------------------------------------------------------------------
// Daily counter helpers — key format: "counter:<name>:<YYYY-MM-DD>"
// ---------------------------------------------------------------------------
function todayKey(name: string): string {
  const d = new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
  return `counter:${name}:${d}`;
}

/** Increment a daily counter and return the new value. */
export async function dailyIncrement(name: string): Promise<number> {
  const key = todayKey(name);
  const raw = await kvGet(key);
  const next = (parseInt(raw ?? "0", 10) || 0) + 1;
  // TTL: 48 h so the key always outlives the day
  await kvPut(key, String(next), 48 * 3600);
  return next;
}

/** Read current daily counter without incrementing. */
export async function dailyCount(name: string): Promise<number> {
  const key = todayKey(name);
  const raw = await kvGet(key);
  return parseInt(raw ?? "0", 10) || 0;
}

export { CF_ENABLED };
