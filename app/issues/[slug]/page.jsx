// app/issues/[slug]/page.jsx
import Link from "next/link";
import Image from "next/image";
import Prose from "../../../components/Prose";
import AutoVisual from "../../../components/auto-visual";
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

// Simple validation: must be a string, no angle brackets, ends with a common image extension
function isValidImageSrc(src) {
  if (typeof src !== "string") return false;
  if (src.includes("<") || src.includes(">")) return false;
  return /\.(avif|webp|jpe?g|png)$/i.test(src);
}

export default async function IssueDetailPage({ params }) {
  // Load full content + frontmatter (HTML string body)
  const data = await getIssueBySlug(params.slug);
  if (!data) notFound();

  const {
    title,
    date,
    tags = [],
    summary,
    image,
    imageAlt,
    contentHtml,
  } = data;

  const alt = imageAlt || title || "Issue image";

  return (
    <main id="main-content" className="container" style={{ paddingBlock: "var(--s-12)" }}>
      <nav aria-label="Breadcrumb" className="flow-1" style={{ marginBottom: "var(--s-6)" }}>
        <Link href="/issues" className="btn btn--outline" aria-label="Back to all issues">
          ← Back to Issues
        </Link>
      </nav>

      {/* 1:1 header visual (image or deterministic art) */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface-2)]">
        {isValidImageSrc(image) ? (
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
            priority={false}
          />
        ) : (
          <AutoVisual
            seed={`${params.slug}|${tags.join(",")}`}
            className="absolute inset-0"
            role="img"
            aria-label={`${title} — generated visual`}
          />
        )}
      </div>

      <article aria-labelledby="issue-title" className="flow-2 mt-6">
        <h1 id="issue-title">{title}</h1>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          {date ? <time dateTime={date}>{formatDate(date)}</time> : null}
          {tags.length > 0 ? (
            <>
              <span aria-hidden="true">•</span>
              <ul className="flex flex-wrap gap-1">
                {tags.map((t) => (
                  <li key={t} className="px-2 py-0.5 rounded-full border border-[var(--border)]">
                    {t}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {/* Lede from frontmatter (optional) */}
        {summary ? <p className="muted">{summary}</p> : null}

        {/* MD/MDX body: HTML string rendered via Prose */}
        {typeof contentHtml === "string" && contentHtml.trim().length > 0 ? (
          <Prose html={contentHtml} />
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

function formatDate(iso) {
  try {
    const d = new Date(iso);
    if (!isNaN(d)) {
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  } catch {}
  return iso;
}
