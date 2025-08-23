// app/sitemap.xml/route.js
import { listIssueSlugs } from "@/lib/mdx";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://brightgreen.org";
  const staticPaths = ["", "about", "press", "contact", "issues", "donate", "volunteer", "privacy", "terms", "compliance"];
  const issueSlugs = await listIssueSlugs();

  const urls = [
    ...staticPaths.map((p) => `${base}/${p}`.replace(/\/$/, "")),
    ...issueSlugs.map((s) => `${base}/issues/${s}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.map((u) => `<url><loc>${u}</loc></url>`).join("")}
  </urlset>`;

  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
