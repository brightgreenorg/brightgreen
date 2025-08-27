// REPLACE FILE: components/artblock.jsx
import Image from "next/image";

function toAspectValue(ratio) {
  // Accepts '3/4', '16/9', '1/1', or 'auto'
  if (!ratio || ratio === "auto") return "auto";
  const parts = String(ratio).split("/");
  if (parts.length === 2 && parts.every((n) => !Number.isNaN(Number(n)))) {
    return `${Number(parts[0])} / ${Number(parts[1])}`;
  }
  return "1 / 1"; // safe fallback now matches default
}

/**
 * ArtBlock — responsive image + copy block that:
 * - Stacks on mobile (image first), 2-col grid on md+.
 * - Uses an aspect-ratio frame so images never "shrink to nothing".
 * - Image fills frame with object-fit: cover; focal point adjustable.
 *
 * Props:
 * - ratio?: '3/4' | '4/3' | '1/1' | '16/9' | 'auto' (default '1/1')
 * - image: { src: string; alt: string; priority?: boolean; focal?: string; sizes?: string; }
 * - imageSide?: 'left' | 'right' (default 'right' on md+; mobile always stacks image first)
 * - tone?: 'card' | 'bare' (default 'card')
 * - align?: 'start' | 'center' (default 'start')
 * - className?: string
 * - caption?: React.ReactNode
 * - children: React.ReactNode (your copy)
 */
export default function ArtBlock({
  ratio = "1/1",
  image,
  imageSide = "right",
  tone = "card",
  align = "start",
  className = "",
  caption = null,
  children,
}) {
  const {
    src,
    alt,
    priority = false,
    focal = "center center",
    sizes = "(min-width:1024px) 50vw, 92vw",
  } = image || {};

  if (!src || !alt) return null;

  const sideClass =
    imageSide === "left" ? "artblock--side-left" : "artblock--side-right";
  const toneClass = tone === "card" ? "artblock--card" : "artblock--bare";
  const alignStyle =
    align === "center" ? { alignSelf: "center" } : { alignSelf: "start" };

  const aspect = toAspectValue(ratio);

  return (
    <div className={`artblock ${sideClass} ${toneClass} ${className}`.trim()}>
      {/* Media */}
      <figure className="artblock__media" style={{ margin: 0 }}>
        <div
          className="artblock__frame"
          style={{
            "--ratio": aspect,
            "--focal": focal,
          }}
        >
          <Image src={src} alt={alt} priority={priority} fill sizes={sizes} />
        </div>
        {caption ? <figcaption className="artblock__caption">{caption}</figcaption> : null}
      </figure>

      {/* Copy */}
      <div className="artblock__content" style={alignStyle}>
        {children}
      </div>
    </div>
  );
}
