// components/Prose.jsx

/**
 * Prose
 * Standardized typography wrapper for rendered Markdown HTML.
 *
 * Usage:
 *   <Prose html={post.contentHtml} />
 *   // or
 *   <Prose><YourRenderedHtml /></Prose>
 */

// tiny utility to merge class names without adding a dependency
function cx(...args) {
  return args.filter(Boolean).join(" ");
}

export default function Prose({ html, children, className }) {
  const classes = cx(
    // Base typography
    "prose prose-neutral md:prose-lg max-w-none",
    // Images inside markdown
    "prose-img:rounded-xl prose-img:shadow-sm prose-img:max-w-full prose-img:h-auto prose-img:mx-auto",
    // Figure + caption
    "prose-figure:my-6 prose-figcaption:text-sm prose-figcaption:leading-snug prose-figcaption:text-gray-500 prose-figcaption:mt-2 prose-figcaption:text-center",
    // Videos / iframes (defensive)
    "prose-video:w-full prose-video:h-auto prose-iframe:w-full",
    className
  );

  if (typeof html === "string") {
    return <div className={classes} dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return <div className={classes}>{children}</div>;
}
