// lib/config.js
// Single source of truth for absolute URLs.
// Production: set NEXT_PUBLIC_SITE_URL to your canonical domain (e.g., https://brightgreen.org)

const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

export const SITE_URL = fromEnv || 'http://localhost:3000'; // dev fallback
