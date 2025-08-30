// NEW FILE: components/issue-teaser.jsx
import Image from "next/image";
import AutoVisual from "./auto-visual";

/**
 * IssueTeaser (presentational only — no <Link> inside)
 *
 * Props:
 *  - issue: { slug, title, summary?, image?, imageAlt?, date?, tags?[] }
 *  - variant: "grid" | "carousel"  (minor typographic/clamp tweaks)
 *  - showDate?: boolean (default true)
 *  - showTags?: boolean (default false)
 *  - ctaLabel?: string (default "Learn more")
 *  - className?: string
 */
export default function IssueTeaser({
  issue = {},
  variant = "grid",
  showDate = true,
  showTags = false,
  ctaLabel = "Learn more",
  className = "",
}) {
  const { slug, title, summary, image, imageAlt, date, tags } = issue;
  const isCarousel = variant === "carousel";

  return (
    <article
      className={`rounded shadow border bg-white overflow-hidden ${className}`}
      style={{
        borderColor: "var(--border)",
      }}
    >
      {/* Media (fixed aspect for consistency) */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt || ""}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 92vw"
            style={{ objectFit: "cover" }}
            priority={false}
          />
        ) : (
          <AutoVisual
            seed={slug || title || "issue"}
            className="absolute inset-0"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {showDate && date ? (
          <div className="text-xs text-neutral-500 mb-1">{formatDate(date)}</div>
        ) : null}

        <h3
          className={`font-semibold tracking-tight text-[var(--ink)] ${
            isCarousel ? "line-clamp-2" : "line-clamp-2"
          }`}
          style={{ marginBottom: "0.25rem" }}
          title={title}
        >
          {title || "Untitled"}
        </h3>

        {summary ? (
          <p
            className={`text-sm text-neutral-700 ${
              isCarousel ? "line-clamp-2" : "line-clamp-3"
            }`}
          >
            {summary}
          </p>
        ) : null}

        {showTags && Array.isArray(tags) && tags.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((t, i) => (
              <li
                key={`${t}-${i}`}
                className="text-[11px] rounded-full border px-2 py-[2px] text-neutral-700"
                style={{ borderColor: "var(--border)" }}
              >
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        {/* CTA hint (presentational only; link lives in parent) */}
        <div className="mt-3">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-700,#2563eb)]">
            {ctaLabel} <span aria-hidden>→</span>
          </span>
        </div>
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
  return typeof iso === "string" ? iso : "";
}
