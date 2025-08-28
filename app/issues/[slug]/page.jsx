// app/issues/[slug]/page.jsx
import { notFound } from "next/navigation";
import { getIssueBySlug, listIssueSlugs } from "../../../lib/mdx";
import Prose from "../../../components/Prose";

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await listIssueSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { title, description } = await getIssueBySlug(params.slug);
  return {
    title: title || "Issue",
    description: description || undefined,
  };
}

export default async function IssuePage({ params }) {
  const data = await getIssueBySlug(params.slug);
  if (!data || data.published === false) {
    notFound();
  }

  const { title, summary, html } = data;

  return (
    <main className="container u-section">
      <h1>{title}</h1>
      {summary ? <p className="text-lg text-muted-foreground mb-6">{summary}</p> : null}
      <Prose>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Prose>
    </main>
  );
}
