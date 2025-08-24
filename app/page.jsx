// app/page.jsx
import Image from "next/image";
import Link from "next/link";
import { getIssues } from "../lib/getIssues";

export const metadata = {
  title: "Bright Green — A people-powered PAC",
  description:
    "Energy, optimism, and clarity. Join Bright Green to support innovation, fairness, and sustainability.",
};

export default async function HomePage() {
  // Pull latest issues from /content/issues (sorted by date in the helper)
  const issues = await getIssues({ limit: 3 });

  return (
    <main>
      {/* Hero */}
      <section className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
          <div className="flow-2">
            <h1>Let’s build a Bright Green future</h1>
            <p className="muted">
              Practical climate action, fair elections, and resilient communities.
              Help us support candidates and causes who move us forward.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" href="/donate">Donate</Link>
              <Link className="btn btn--secondary" href="/volunteer">Volunteer</Link>
              <Link className="btn btn--outline" href="/issues">Our Issues</Link>
            </div>
          </div>

          {/* Hero art container (scoped) */}
          <div className="rounded shadow hero-art">
            <Image
              src="/images/hero-desktop.avif"
              alt="Bright, optimistic Oregon scene"
              priority
              fill
              sizes="(min-width:1536px) 1400px, (min-width:1280px) 1320px, (min-width:1024px) 1200px, (min-width:768px) 90vw, 100vw"
              quality={90}
              style={{ objectFit: "cover", objectPosition: "center 35%" }}
            />
          </div>
        </div>
      </section>

      {/* Issues pulled from Markdown (sorted by date) */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}>
          {issues.length > 0 ? (
            issues.map((issue) => (
              <article key={issue.slug} className="rounded shadow" style={{ border: "1px solid var(--border)", padding: 18 }}>
                <h3 style={{ color: "var(--ink)" }}>{issue.title}</h3>
                <p className="muted">{issue.summary}</p>
                <Link className="btn btn--alt" href={`/issues/${issue.slug}`} style={{ marginTop: 12 }}>
                  Learn more
                </Link>
              </article>
            ))
          ) : (
            <p className="muted">
              No issues found. Add markdown files to <code>/content/issues</code> with a
              <code> date:</code> in the frontmatter (YYYY-MM-DD).
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
