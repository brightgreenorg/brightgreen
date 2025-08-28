// app/issues/page.jsx
import Link from "next/link";
import { listIssuesMeta } from "../../lib/mdx";

export const metadata = {
  title: "Issues — Bright Green",
  description: "Learn about the issues Bright Green is tackling and why they matter.",
};

export default async function IssuesPage() {
  const issues = await listIssuesMeta();

  return (
    <main id="main-content" className="container u-section">
      <section aria-labelledby="issues-heading" className="flow-2">
        <h1 id="issues-heading">Issues</h1>

        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
        >
          {issues.length > 0 ? (
            issues.map((issue) => (
              <article
                key={issue.slug}
                className="rounded-2xl p-5 border border-[var(--border)] bg-white shadow-card flow-1"
              >
                {issue.image ? (
                  <div className="mb-3 rounded-xl overflow-hidden aspect-[16/9] bg-[var(--surface-2)]">
                    <img
                      src={issue.image}
                      alt={issue.image_alt || issue.title}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 320px, 100vw"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}

                <h3>{issue.title}</h3>
                <p className="muted">{issue.summary}</p>
                <Link
                  href={`/issues/${issue.slug}`}
                  className="btn btn--primary inline-block mt-2"
                  aria-label={`Read more about ${issue.title}`}
                >
                  Read more
                </Link>
              </article>
            ))
          ) : (
            <p className="muted">No issues found. Please check back soon.</p>
          )}
        </div>
      </section>
    </main>
  );
}
