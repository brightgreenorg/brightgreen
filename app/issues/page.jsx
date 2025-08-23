// app/issues/page.jsx
import Link from 'next/link';
import { getIssues } from '@/lib/mdx';

export const metadata = { title: 'Issues' };

export default async function IssuesPage() {
  const issues = await getIssues();

  return (
    <main className="container">
      <h1>Issues</h1>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
        {issues.map(issue => (
          <article key={issue.slug} className="rounded shadow" style={{ padding: '16px', border: '1px solid var(--border)', background: '#fff' }}>
            <h3 style={{ marginBottom: 6 }}>{issue.title}</h3>
            <p className="muted" style={{ marginBottom: 10 }}>{issue.summary}</p>
            <Link href={`/issues/${issue.slug}`} className="btn btn--primary">Read more</Link>
          </article>
        ))}
      </div>
    </main>
  );
}
