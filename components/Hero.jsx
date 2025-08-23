"use client";

import Link from "next/link";

/**
 * Reusable hero block.
 * Props:
 * - eyebrow?: string
 * - title: string
 * - subtitle?: string
 * - primaryCta?: { label: string; href: string }
 * - secondaryCta?: { label: string; href: string }
 * - variant?: "light" | "dark" | "limeYellow" (default "limeYellow")
 * - align?: "left" | "center" (default "center")
 */
export default function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = "limeYellow",
  align = "center",
}) {
  const variantStyles = {
    limeYellow: {
      background:
        "linear-gradient(180deg, rgba(126,217,87,.20), rgba(244,208,63,.20))",
      color: "#111",
    },
    dark: {
      background: "linear-gradient(180deg, rgba(0,0,0,.30), rgba(0,0,0,.30))",
      color: "#fff",
    },
    light: { background: "#fff", color: "#111" },
  };

  const style = {
    ...variantStyles[variant],
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    boxShadow: "var(--shadow)",
    padding: "40px",
    textAlign: align,
  };

  const titleStyle = {
    fontFamily: "var(--font-display, 'League Spartan'), system-ui, sans-serif",
    fontWeight: 800,
    fontSize: 42,
    lineHeight: 1.1,
    margin: "10px 0 6px",
  };

  const subStyle = { color: "var(--muted)" };

  return (
    <section className="container" style={{ marginTop: "var(--s-12)" }}>
      <div className="rounded shadow" style={style}>
        {eyebrow ? (
          <span
            aria-label="section label"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid var(--border)",
              font: "700 12px/1 var(--font-display, 'League Spartan'), system-ui, sans-serif",
              background: "var(--lime)",
              color: "#111",
            }}
          >
            {eyebrow}
          </span>
        ) : null}

        <h1 style={titleStyle}>{title}</h1>
        {subtitle ? <p style={subStyle}>{subtitle}</p> : null}

        {(primaryCta || secondaryCta) && (
          <div style={{ marginTop: 12, display: "flex", gap: 12, flexWrap: "wrap", justifyContent: align === "center" ? "center" : "flex-start" }}>
            {primaryCta && (
              <Link href={primaryCta.href} className="btn btn--primary">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn btn--secondary">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
