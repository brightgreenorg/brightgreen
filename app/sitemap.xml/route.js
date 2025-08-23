// app/sitemap.xml/route.js
import { listIssueSlugs } from '@/lib/mdx';

export async function GET() {
  // You can set SITE_URL in Vercel → Project → Settings → Environment Variables later if you like.
  const BASE = process.env.SITE_URL || 'https://brightgreen.org';

  const slugs = await listIssueSlugs(); // only real files
  const staticPaths = ['', 'about', 'press', 'donate', 'volunteer', 'issues', 'privacy', 'terms', 'compliance'];
  const allPaths = [
    ...staticPaths.map((p) => `${BASE}/${p}`.replace(/\/+$/, '/')),
    ...slugs.map((slug) => `${BASE}/issues/${slug}`),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPaths
  .map(
    (loc) => `<url>
  <loc>${loc}</loc>
  <changefreq>weekly</changefreq>
  <priority>${/\/issues\/.+$/.test(loc) ? '0.7' : '0.8'}</priority>
</url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
