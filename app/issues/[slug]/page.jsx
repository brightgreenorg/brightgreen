// app/issues/[slug]/page.jsx
import { getIssueBySlug } from "@/lib/mdx";

export async function generateStaticParams() {
  const { listIssueSlugs } = await import("@/lib/mdx");
  const slugs = await listIssueSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const issue = await getIssueBySlug(params.slug);
  return { title: issue.meta.title, description: issue.meta.description };
}

export default async function IssuePage({ params }) {
  const issue = await getIssueBySlug(params.slug);

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>{issue.meta.title}</h1>
      <article className="prose" dangerouslySetInnerHTML={{ __html: issue.html }} />
    </main>
  );
}
