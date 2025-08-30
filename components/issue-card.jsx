// REPLACE FILE: components/issue-card.jsx
import Link from "next/link";
import IssueTeaser from "./issue-teaser";

/**
 * IssueCard — now a thin wrapper around IssueTeaser (grid variant)
 * Public props kept the same for compatibility:
 *  - slug, title, summary, date, tags, image?, imageAlt?
 *  - className? (optional)
 */
export default function IssueCard(props) {
  const {
    slug,
    title,
    summary,
    date,
    tags,
    image,
    imageAlt,
    className = "",
    // Allow passthrough of optional toggles if any callers set them
    showDate = true,
    showTags = false,
    ctaLabel = "Learn more",
  } = props;

  const issue = { slug, title, summary, date, tags, image, imageAlt };

  return (
    <Link
      href={slug ? `/issues/${slug}` : "#"}
      className="block focus:outline-none focus:ring rounded-[18px]"
      aria-label={title ? `Read: ${title}` : "Read issue"}
    >
      <IssueTeaser
        issue={issue}
        variant="grid"
        showDate={showDate}
        showTags={showTags}
        ctaLabel={ctaLabel}
        className={className}
      />
    </Link>
  );
}
