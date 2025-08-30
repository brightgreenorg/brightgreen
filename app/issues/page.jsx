// app/issues/page.jsx
import Link from "next/link";
import EngagementRail from "@/components/engagement-rail";
import { listIssuesMeta } from "@/lib/mdx";

export const metadata = {
  title: "Issues • Bright Green",
  description:
    "Explore Bright Green’s issue briefs and summaries — grounded, transparent, and pragmatic.",
};

export default async function IssuesIndexPage() {
  const issues = await listIssuesMeta();

  return (
    <main className="u-section">
      <div className="container">
        <header className="flow-2" style={{ marginBottom: "var(--s-6)" }}>
          <h1>Issues</h1>
          <p className="muted">Brief summaries and positions, evolving with your input.</p>
        </header>

        <section
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "var(--gutter)",
          }}
        >
          {issues.map((m) => (
            <article key={m.slug} className="u-card" style={{ padding: 16 }}>
              <h2 style={{ fontSize: 20, lineHeight: 1.2, marginBottom: 6 }}>
                <Link href={`/issues/${m.slug}`}>{m.title}</Link>
              </h2>
              {m.summary ? <p className="muted" style={{ fontSize: 14 }}>{m.summary}</p> : null}
              <div style={{ marginTop: 12 }}>
                <Link className="btn btn--outline" href={`/issues/${m.slug}`} aria-label={`Read ${m.title}`}>
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Subtle end-cap */}
        <EngagementRail />
      </div>
    </main>
  );
}
