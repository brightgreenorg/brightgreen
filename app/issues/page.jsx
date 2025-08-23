// app/issues/page.jsx
import Link from "next/link";
import { listIssueSlugs, getIssueMeta } from "@/lib/mdx";

export const metadata = { title: "Issues", description: "What we support and why." };

function parseDate(d) {
  // Robust parse: treat missing/invalid as very old so they sort last
  const t = d ? Date.parse(d) : NaN;
  return Number.isNaN(t) ? 0 : t;
}

export default async function IssuesIndex() {
  const slugs = await listIssueSlugs();
  const metas = await Promise.all(slugs.map((s) => getIssueMeta(s)));

  // Sort newest first by frontmatter `date`
  metas.sort((a, b) => parseDate(b.date) - parseDate(a.date));

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>Issues</h1>
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", marginTop: 18 }}
      >
        {metas.map((m) => (
          <article
            key={m.slug}
            className="rounded shadow"
            style={{ border: "1px solid var(--border)", padding: 18 }}
          >
            <h3 style={{ color: "var(--ink)" }}>{m.title}</h3>
            <p className="muted">{m.description}</p>
            <Link className="btn btn--alt" href={`/issues/${m.slug}`} style={{ marginTop: 12 }}>
              Read more
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
