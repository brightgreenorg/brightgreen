// app/issues/page.jsx
import IssueCard from "../../components/issue-card";
import { listIssuesMeta } from "../../lib/mdx";

export const metadata = {
  title: "Issues — Bright Green",
  description: "Learn about the issues Bright Green is tackling and why they matter.",
};

export default async function IssuesPage() {
  const issues = await listIssuesMeta(); // returns newest-first per mdx.js

  return (
    <main id="main-content" className="container u-section">
      <section aria-labelledby="issues-heading" className="flow-2">
        <h1 id="issues-heading">Issues</h1>

        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
        >
          {issues.length > 0 ? (
            issues.map((issue) => {
              const slug =
                typeof issue.slug === "string" ? issue.slug.replace(/\.mdx?$/i, "") : String(issue.slug || "");
              return (
                <IssueCard
                  key={issue.slug}
                  slug={slug}
                  {...issue} // pass through title, summary, date, tags, image, imageAlt (if present)
                />
              );
            })
          ) : (
            <p className="muted">No issues found. Please check back soon.</p>
          )}
        </div>
      </section>
    </main>
  );
}
