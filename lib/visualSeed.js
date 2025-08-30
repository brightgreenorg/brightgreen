// lib/visualSeed.js

/**
 * visualSeed(str): returns a stable 32-bit integer hash for a string.
 * Small, deterministic, good enough for visual seeding (not crypto).
 */
export function visualSeed(str) {
  let h = 2166136261 >>> 0; // FNV-1a offset basis
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // Final avalanching
  h += h << 13; h ^= h >>> 7;
  h += h << 3;  h ^= h >>> 17;
  h += h << 5;
  return h >>> 0;
}
