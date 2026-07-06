// frontend/lib/cache.ts

/**
 * Simple in-memory + localStorage caching layer
 * For SwiftReply frontend performance optimization
 */

type CacheEntry<T> = {
  value: T;
  expiresAt?: number;
};

const memoryCache: Record<string, CacheEntry<any>> = {};

/**
 * Set cache (memory + optional localStorage)
 */
export function setCache<T>(
  key: string,
  value: T,
  ttlMs?: number,
  useLocalStorage = true
): void {
  const expiresAt = ttlMs ? Date.now() + ttlMs : undefined;

  memoryCache[key] = {
    value,
    expiresAt,
  };

  if (useLocalStorage && typeof window !== "undefined") {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ value, expiresAt })
      );
    } catch {
      // ignore storage errors
    }
  }
}

/**
 * Get cache value
 */
export function getCache<T>(key: string): T | null {
  const memory = memoryCache[key];

  if (memory) {
    if (memory.expiresAt && Date.now() > memory.expiresAt) {
      delete memoryCache[key];
      return null;
    }
    return memory.value;
  }

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      const parsed: CacheEntry<T> = JSON.parse(raw);

      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        localStorage.removeItem(key);
        return null;
      }

      memoryCache[key] = parsed;
      return parsed.value;
    } catch {
      return null;
    }
  }

  return null;
}

/**
 * Remove cache
 */
export function removeCache(key: string): void {
  delete memoryCache[key];

  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}

/**
 * Clear all cache
 */
export function clearCache(): void {
  Object.keys(memoryCache).forEach((k) => delete memoryCache[k]);

  if (typeof window !== "undefined") {
    localStorage.clear();
  }
}

/**
 * Check if cache exists and is valid
 */
export function hasCache(key: string): boolean {
  return getCache(key) !== null;
}