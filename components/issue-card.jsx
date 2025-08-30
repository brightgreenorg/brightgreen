// components/issue-card.jsx
import Link from "next/link";
import Image from "next/image";
import AutoVisual from "./auto-visual";

/**
 * IssueCard — background image with bottom "bubble" content.
 *
 * Props:
 *  - slug, title, summary, date, tags (string[])
 *  - image (optional), imageAlt (optional)
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
  const cleanSlug =
    typeof slug === "string" ? slug.replace(/\.mdx?$/i, "") : String(slug || "");
  const href = `/issues/${cleanSlug}`;
  const alt = imageAlt || title || "Issue image";

  return (
    <article
      className="relative u-card border border-[var(--border)] overflow-hidden rounded-2xl"
      tabIndex={0}
      aria-label={title ? `Issue: ${title}` : "Issue"}
      style={{ aspectRatio: "4 / 3" }}
    >
      {/* Background visual (image or deterministic fallback) */}
      <div className="absolute inset-0">
        {isValidImageSrc(image) ? (
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
            seed={`${cleanSlug}|${(tags || []).join(",")}`}
            className="absolute inset-0"
            role="img"
            aria-label={`${title ?? "Issue"} — generated visual`}
          />
        )}

        {/* Bottom gradient for contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,.38) 35%, rgba(0,0,0,0) 100%)",
          }}
        />
      </div>

      {/* Bubble content */}
      <div className="absolute inset-x-3 bottom-3 md:inset-x-4 md:bottom-4">
        <div className="rounded-xl p-4 md:p-5 bg-white/92 dark:bg-black/70 backdrop-blur-sm border border-[var(--border)] shadow">
          <h3
            className="text-xl font-semibold leading-snug"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </h3>

          {summary ? (
            <p
              className="muted mt-2"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {summary}
            </p>
          ) : null}

          {/* Tags */}
          {Array.isArray(tags) && tags.length > 0 ? (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <li
                  key={t}
                  className="px-2 py-0.5 rounded-full border border-[var(--border)] text-sm bg-white/70 dark:bg-black/40"
                >
                  {t}
                </li>
              ))}
            </ul>
          ) : null}

          {/* Footer: Read + date */}
          <div className="mt-3 flex items-center gap-3">
            <Link
              href={href}
              className="u-btn u-btn-primary"
              aria-label={`Read: ${title}`}
            >
              Read
            </Link>
            {date ? (
              <time className="muted text-sm" dateTime={date}>
                {formatDate(date)}
              </time>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function isValidImageSrc(src) {
  if (typeof src !== "string") return false;
  if (!src || src.includes("<") || src.includes(">")) return false;
  return /\.(avif|webp|jpe?g|png)$/i.test(src);
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
