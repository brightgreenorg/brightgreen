"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const nav = [
    { label: "Home", href: "/" },
    { label: "Issues", href: "/issues" },
    { label: "About", href: "/about" },
    { label: "Press", href: "/press" },
    { label: "Volunteer", href: "/volunteer" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "var(--black)",
        color: "#fff",
        borderBottom: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "14px 0",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display, 'League Spartan'), system-ui, sans-serif",
            fontWeight: 800,
            fontSize: 20,
            lineHeight: 1,
            letterSpacing: ".4px",
            color: "#fff",
          }}
          aria-label="Bright Green PAC — Home"
        >
          Bright Green PAC
        </Link>

        <nav aria-label="Main" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {nav.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              style={{
                color: "#fff",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: 999,
                fontWeight: 600,
                opacity: 0.95,
                background: isActive(href) ? "rgba(255,255,255,.15)" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}

          {/* CTA stays a button, not “active” */}
          <Link href="/donate" className="btn btn--primary">
            Donate
          </Link>
        </nav>
      </div>
    </header>
  );
}
