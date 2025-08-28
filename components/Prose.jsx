// components/Prose.jsx
import clsx from "clsx";

/**
 * Prose
 * Standardized typography wrapper for rendered Markdown HTML.
 *
 * Usage:
 *   <Prose html={post.contentHtml} />
 *   // or
 *   <Prose><YourRenderedHtml /></Prose>
 *
 * Notes:
 * - Applies consistent image styles, captions, and spacing.
 * - Safe to combine with additional className props.
 */
export default function Prose({ html, children, className }) {
  return (
    <div
      className={clsx(
        // Base typography
        "prose prose-neutral md:prose-lg max-w-none",
        // Images inside markdown
        // - responsive, rounded, subtle shadow, centered by default
        "prose-img:rounded-xl prose-img:shadow-sm prose-img:max-w-full prose-img:h-auto prose-img:mx-auto",
        // Figure + caption
        "prose-figure:my-6 prose-figcaption:text-sm prose-figcaption:leading-snug prose-figcaption:text-gray-500 prose-figcaption:mt-2 prose-figcaption:text-center",
        // Videos / iframes (defensive)
        "prose-video:w-full prose-video:h-auto prose-iframe:w-full",
        className
      )}
      {...(html ? { dangerouslySetInnerHTML: { __html: html } } : {})}
    >
      {!html && children}
    </div>
  );
}
