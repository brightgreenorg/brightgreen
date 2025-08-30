// app/issues/[slug]/page.jsx
import Image from "next/image";
import EngagementRail from "@/components/engagement-rail";
import AutoVisual from "@/components/auto-visual";
import { notFound } from "next/navigation";
import { listIssueSlugs, getIssueBySlug } from "@/lib/mdx";

// Create human title from slug if frontmatter is missing a title
function humanizeSlug(slug = "") {
  return slug
    .split("-")
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : ""))
    .join(" ");
}

export async function generateStaticParams() {
  const slugs = await listIssueSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const issue = await getIssueBySlug(params.slug);
  if (!issue) return {};
  const title = issue.title || humanizeSlug(params.slug);
  const description = issue.description || issue.summary || undefined;
  return {
    title: `${title} • Issues • Bright Green`,
    description,
  };
}

export default async function IssuePage({ params }) {
  const issue = await getIssueBySlug(params.slug);
  if (!issue) return notFound();

  const {
    title = humanizeSlug(params.slug),
    summary,
    contentHtml = "",
    image = "",
    imageAlt = "",
    tags = [],
    slug,
  } = issue;

  // helper to check likely-valid local/public image paths
  const hasImage =
    typeof image === "string" &&
    image.trim().length > 0 &&
    // basic extension sanity check
    /\.(avif|webp|jpe?g|png|gif|svg)$/i.test(image.trim());

  return (
    <main className="u-section">
      <div className="container">

        {/* Visual header: 1:1 crop like the cards */}
        <div
          className="artblock__frame"
          style={{ ["--ratio"]: "1 / 1" }}
        >
          {hasImage ? (
            <Image
              src={image}
              alt={imageAlt || `${title} visual`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              priority={false}
            />
          ) : (
            <AutoVisual
              seed={`${slug || params.slug}|${Array.isArray(tags) ? tags.join(",") : ""}`}
              className="w-full h-full"
            />
          )}
        </div>

        <article className="prose" style={{ marginTop: "var(--s-6)" }}>
          <header className="flow-2" style={{ marginBottom: "var(--s-6)" }}>
            <h1>{title}</h1>
            {summary ? <p className="muted">{summary}</p> : null}
          </header>

          {/* Render HTML produced by lib/mdx.js (contentHtml) */}
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>

        {/* Subtle end-cap */}
        <EngagementRail />
      </div>
    </main>
  );
}
