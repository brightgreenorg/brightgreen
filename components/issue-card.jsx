// components/issue-card.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import AutoVisual from "./auto-visual";

/**
 * IssueCard
 * Wide rectangular card with a 1:1 media slot at the top.
 * Expects: { slug, title, summary, date, tags?, image?, imageAlt? }
 */
export default function IssueCard({
  slug,
  title,
  summary,
  date,
  tags = [],
  image,
  imageAlt,
}) {
  const alt = imageAlt || title || "Issue image";

  return (
    <article
      className="rounded-2xl overflow-hidden border border-[var(--border)] bg-white shadow-card focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black/80"
      aria-labelledby={`issue-card-${slug}`}
    >
      {/* 1:1 media slot */}
      <div className="relative w-full aspect-square bg-[var(--surface-2)]">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        ) : (
          <AutoVisual
            seed={`${slug}|${(tags || []).join(",")}`}
            className="absolute inset-0"
            role="img"
            aria-label={`${title} — generated visual`}
          />
        )}
      </div>

      {/* Body */}
      <div className="p-5 flow-1">
        <h3 id={`issue-card-${slug}`} className="line-clamp-2 text-balance">
          {title}
        </h3>

        {summary ? (
          <p className="muted line-clamp-3">{summary}</p>
        ) : null}

        {/* Meta: date + tags (optional) */}
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          {date ? <time dateTime={date}>{formatDate(date)}</time> : null}
          {tags && tags.length > 0 ? (
            <>
              <span aria-hidden="true">•</span>
              <ul className="flex flex-wrap gap-1">
                {tags.map((t) => (
                  <li
                    key={t}
                    className="px-2 py-0.5 rounded-full border border-[var(--border)]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        {/* Read affordance */}
        <Link
          href={`/issues/${slug}`}
          className="btn btn--primary inline-block mt-3"
          aria-label={`Read more about ${title}`}
        >
          Read
        </Link>
      </div>
    </article>
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
