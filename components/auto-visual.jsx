// components/auto-visual.jsx
"use client";

import { useMemo } from "react";
import { getPaletteForTags } from "../lib/tagTheme";
import { visualSeed } from "../lib/visualSeed";

/**
 * AutoVisual
 * Deterministic, decorative SVG background based on a seed.
 * Renders a layered radial/angle blend with subtle geometry.
 */
export default function AutoVisual({ seed, className = "", ...rest }) {
  const { hue1, hue2, hue3, angle, r1, r2 } = useMemo(() => compute(seed), [seed]);

  // Build gradient stops using the palette hues
  const stop1 = `hsl(${hue1} 60% 52%)`;
  const stop2 = `hsl(${hue2} 65% 46%)`;
  const stop3 = `hsl(${hue3} 70% 40%)`;

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <defs>
        <radialGradient id="rg" cx={r1.cx} cy={r1.cy} r={r1.r}>
          <stop offset="0" stopColor={stop1} />
          <stop offset="1" stopColor={stop2} />
        </radialGradient>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1" gradientTransform={`rotate(${angle})`}>
          <stop offset="0" stopColor={stop3} stopOpacity="0.9" />
          <stop offset="1" stopColor={stop2} stopOpacity="0.6" />
        </linearGradient>
        <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.6" fill="white" opacity="0.08" />
        </pattern>
        <mask id="softMask">
          <rect width="100" height="100" fill="url(#rg)" />
        </mask>
      </defs>

      {/* Base gradient field */}
      <rect width="100" height="100" fill="url(#rg)" />

      {/* Angled overlay to add directionality */}
      <rect width="100" height="100" fill="url(#lg)" opacity="0.6" />

      {/* Soft vignette / blob via second radial */}
      <circle cx={r2.cx} cy={r2.cy} r={r2.r} fill="white" opacity="0.06" />

      {/* Subtle texture */}
      <rect width="100" height="100" fill="url(#dots)" mask="url(#softMask)" />
    </svg>
  );
}

function compute(seed) {
  const s = visualSeed(seed);
  // Derive hues from seed
  const tagsPalette = getPaletteForTags(seed);
  const hue1 = tagsPalette[0];
  const hue2 = tagsPalette[1] ?? (hue1 + 30) % 360;
  const hue3 = tagsPalette[2] ?? (hue1 + 300) % 360;

  // Angle 0–360
  const angle = Math.floor(((s >> 8) % 360) + 360) % 360;

  // Radial centers in 0–1 (SVG viewBox units 0–100)
  const rand01 = (n) => (((s >> n) & 0xff) / 255);
  const r1 = {
    cx: 20 + 60 * rand01(4),
    cy: 20 + 60 * rand01(12),
    r: 0.7,
  };
  const r2 = {
    cx: 20 + 60 * rand01(20),
    cy: 20 + 60 * rand01(28),
    r: 40 + 40 * rand01(16),
  };

  return { hue1, hue2, hue3, angle, r1, r2 };
}
