// components/Header.jsx
"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="container" style={{ display: "flex", alignItems: "center", gap: 16, paddingBlock: 14 }}>
        {/* Brand */}
        <div style={{ flex: "0 0 auto" }}>
          <Link href="/" aria-label="Bright Green home">
            <span style={{ fontWeight: 800 }}>Bright Green</span>
          </Link>
        </div>

        {/* Primary nav */}
        <nav
          aria-label="Primary"
          style={{ display: "flex", gap: 18, alignItems: "center", marginLeft: "auto", marginRight: 16 }}
        >
          <Link href="/issues">Issues</Link>
          <Link href="/about">About</Link>
        </nav>

        {/* CTAs — Volunteer (green) first, Donate (violet) second */}
        <div className="header-ctas" style={{ display: "flex", gap: 10 }}>
          <Link href="/volunteer" className="btn btn--secondary" aria-label="Become a volunteer">
            Volunteer
          </Link>
          <Link href="/donate" className="btn btn--primary" aria-label="Go to the Donate page">
            Donate
          </Link>
        </div>
      </div>
    </header>
  );
}
