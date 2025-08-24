// REPLACE FILE: app/page.jsx
import Link from "next/link";
import { getIssues } from "../lib/getIssues";
import Hero from "../components/Hero";

export const metadata = {
  title: "Bright Green — A people-powered PAC",
  description:
    "Energy, optimism, and clarity. Join Bright Green to support innovation, fairness, and sustainability.",
};

export default async function HomePage() {
  // Pull latest issues from /content/issues (sorted by date in the helper)
  const issues = await getIssues({ limit: 3 });

  return (
    <>
      {/* Full‑bleed hero with above‑the‑fold CTAs */}
      <Hero />

      {/* Issues pulled from Markdown (sorted by date) */}
      <main id="main-content">
        <section className="container" style={{ paddingBlock: 48 }}>
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}
          >
            {issues.length > 0 ? (
              issues.map((issue) => (
                <article
                  key={issue.slug}
                  className="rounded shadow"
                  style={{ border: "1px solid var(--border)", padding: 18 }}
                >
                  <h3 style={{ color: "var(--ink)" }}>{issue.title}</h3>
                  <p className="muted">{issue.summary}</p>
                  <Link
                    className="btn btn--alt"
                    href={`/issues/${issue.slug}`}
                    style={{ marginTop: 12 }}
                  >
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
    </>
  );
}
