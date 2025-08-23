// app/issues/[slug]/page.jsx
import { notFound } from 'next/navigation';
import { getIssueBySlug, listIssueSlugs } from '@/lib/mdx';

export async function generateStaticParams() {
  const slugs = await listIssueSlugs(); // only build pages that actually exist on disk
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  try {
    const issue = await getIssueBySlug(slug);
    const title = issue?.title ?? issue?.frontmatter?.title ?? slug;
    const description = issue?.description ?? issue?.frontmatter?.description ?? '';
    return { title: `${title} · Issues`, description };
  } catch {
    return { title: `Issue · ${slug}` };
  }
}

export default async function IssuePage({ params }) {
  const { slug } = params;

  let issue;
  try {
    issue = await getIssueBySlug(slug);
  } catch {
    notFound();
  }
  if (!issue) notFound();

  const title = issue.title ?? issue.frontmatter?.title ?? slug;
  const description = issue.description ?? issue.frontmatter?.description ?? '';
  const html = issue.html ?? '';

  return (
    <div className="container">
      <article className="prose">
        <h1>{title}</h1>
        {description && <p className="muted">{description}</p>}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </div>
  );
}
