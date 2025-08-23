// app/sitemap.xml/route.js
import { listIssueSlugs } from '@/lib/mdx';

// Build once per day
export const revalidate = 86400; // seconds
// Optional: run at the edge
export const runtime = 'edge';

export async function GET() {
  // Configure SITE_URL in Vercel → Project → Settings → Environment Variables
  const BASE = (process.env.SITE_URL || 'https://brightgreen.org').replace(/\/+$/, '');

  const slugs = await listIssueSlugs(); // only real files on disk

  // Choose one policy; here we go with NO trailing slashes.
  const staticPaths = ['', 'about', 'press', 'donate', 'volunteer', 'issues', 'privacy', 'terms', 'compliance'];

  const allPaths = [
    ...staticPaths.map((p) => (p ? `${BASE}/${p}` : `${BASE}`)),
    ...slugs.map((slug) => `${BASE}/issues/${slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map(
    (loc) => `<url>
  <loc>${loc}</loc>
  <changefreq>weekly</changefreq>
  <priority>${/\/issues\/[^/]+$/.test(loc) ? '0.7' : '0.8'}</priority>
</url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
