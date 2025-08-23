"use client";

import Link from "next/link";

/**
 * Consistent donate CTA. External URLs open safely in a new tab.
 * Props:
 * - href?: string (default "/donate")
 * - label?: string (default "Donate")
 * - amount?: number | null (appends ?amount= if provided)
 * - variant?: "primary" | "secondary" | "alt" | "outline" (default "primary")
 * - dataAttrs?: Record<string, string>
 */
export default function DonateButton({
  href = "/donate",
  label = "Donate",
  amount = null,
  variant = "primary",
  dataAttrs = {},
}) {
  const isExternal = /^https?:\/\//i.test(href);
  const url =
    amount != null ? (href.includes("?") ? `${href}&amount=${amount}` : `${href}?amount=${amount}`) : href;

  const rel = isExternal ? "noopener noreferrer" : undefined;
  const target = isExternal ? "_blank" : undefined;

  return (
    <Link
      href={url}
      className={`btn btn--${variant}`}
      rel={rel}
      target={target}
      {...Object.fromEntries(Object.entries(dataAttrs).map(([k, v]) => [`data-${k}`, v]))}
    >
      {label}
    </Link>
  );
}
