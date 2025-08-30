// lib/tagTheme.js

/**
 * Map tags to brand hue families (H values in HSL).
 * Keep it small and opinionated; unknown tags use the neutral fallback.
 */
const TAG_HUES = {
  climate: [140, 160, 120],     // greens
  economy: [35, 20, 48],        // amber/orange
  education: [215, 230, 200],   // blues
  health: [350, 5, 330],        // reds/rose
  tech: [265, 280, 245],        // violets
  community: [185, 200, 165],   // teals
};

const NEUTRAL_FALLBACK = [145, 210, 45]; // Bright Green-adjacent triad

/**
 * getPaletteForTags(seedKey)
 * Accepts any string (we often pass slug|tags).
 * Picks one tag if present in the string; else returns neutral.
 */
export function getPaletteForTags(seedKey) {
  const keyLower = String(seedKey).toLowerCase();
  for (const tag of Object.keys(TAG_HUES)) {
    if (keyLower.includes(tag)) return TAG_HUES[tag];
  }
  return NEUTRAL_FALLBACK;
}
