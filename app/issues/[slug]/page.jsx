// app/issues/[slug]/page.jsx
import Link from "next/link";
import Prose from "../../../components/Prose";
import { listIssuesMeta, getIssueBySlug } from "../../../lib/mdx";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  // Use the lightweight index for metadata (fast path)
  const issues = await listIssuesMeta();
  const issue = issues.find((i) => i.slug === params.slug);
  if (!issue) return { title: "Issue not found — Bright Green" };
  return {
    title: `${issue.title} — Bright Green`,
    description: issue.summary ?? "Issue details from Bright Green.",
  };
}

export default async function IssueDetailPage({ params }) {
  // Load full MDX content + frontmatter
  const data = await getIssueBySlug(params.slug);
  if (!data || !data.meta) notFound();

  const { meta, Content } = data;

  return (
    <main id="main-content" className="container" style={{ paddingBlock: "var(--s-12)" }}>
      <nav aria-label="Breadcrumb" className="flow-1" style={{ marginBottom: "var(--s-6)" }}>
        <Link href="/issues" className="btn btn--outline" aria-label="Back to all issues">
          ← Back to Issues
        </Link>
      </nav>

      <article aria-labelledby="issue-title" className="flow-2">
        <h1 id="issue-title">{meta.title}</h1>

        {/* Lede from frontmatter (optional) */}
        {meta.summary ? <p className="muted">{meta.summary}</p> : null}

        {/* MDX body */}
        {Content ? (
          <Prose>
            <Content />
          </Prose>
        ) : (
          <Prose>
            <p>
              Full issue content will appear here once{" "}
              <code>/content/issues/{params.slug}.md</code> includes a body. For now, this page
              shows the title and summary from frontmatter.
            </p>
          </Prose>
        )}
      </article>
    </main>
  );
}
