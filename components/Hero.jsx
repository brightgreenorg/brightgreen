// components/Helro.jsx
"use client";

import Image from "next/image";

/**
 * Hero (CTA-free, overlay copy on photo)
 * - Background art layer is absolutely positioned to fill the section.
 * - Copy layer sits above via z-index, restoring the prior overlay effect.
 */

export default function Hero({
  title = "Bright Green",
  eyebrow,
  subtitle,
  imgDesktop = "/images/hero-desktop.avif",
  imgTablet = "/images/hero-tablet.avif",
  imgMobile = "/images/hero-mobile.avif",
  focal = "center 35%",
  fullBleed = false,
  onPhoto = true,
}) {
  return (
    <section
      className={[
        "hero",
        fullBleed ? "hero--full" : "",
        onPhoto ? "hero--on-photo" : "",
      ].join(" ")}
      style={{ position: "relative" }}
    >
      {/* Background art fills the entire hero */}
      <div
        className="hero-art"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          ["--focal"]: focal,
        }}
        aria-hidden="true"
      >
        <Image
          src={imgDesktop}
          alt=""
          priority
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
        <div className="hero__fade" />
      </div>

      {/* Foreground copy overlays the image */}
      <div
        className="hero__inner hero__inner--split container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="hero__copy flow-2">
          {eyebrow ? (
            <p className="muted" aria-label="Section label">
              {eyebrow}
            </p>
          ) : null}
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
          {/* CTAs intentionally omitted per Option 4A */}
        </div>

        {/* Spacer rows preserve the split rhythm */}
        <div />
        <div aria-hidden="true" />
      </div>
    </section>
  );
}
