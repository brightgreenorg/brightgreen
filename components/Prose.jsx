/**
 * Typographic wrapper for long-form content (MD/MDX).
 * Props:
 * - as?: valid HTML tag, default "div"
 * - maxWidth?: "72ch" | "wide" | "full" (default "72ch")
 * - className?: string
 */
export default function Prose({
  as: Tag = "div",
  maxWidth = "72ch",
  className = "",
  style,
  ...props
}) {
  const widthStyle =
    maxWidth === "wide" ? { maxWidth: "90ch" } : maxWidth === "full" ? { maxWidth: "none" } : undefined;

  return (
    <Tag
      className={`prose ${className}`.trim()}
      style={{ ...widthStyle, ...style }}
      {...props}
    />
  );
}
