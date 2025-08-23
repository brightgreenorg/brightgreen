"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const links = [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Contact", href: "/contact" },
    { label: "Compliance", href: "/compliance" },
  ];

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: "var(--s-12)" }}>
      <div className="container" style={{ padding: "24px 0" }}>
        <p className="muted" style={{ fontSize: 14 }}>
          © {new Date().getFullYear()} Bright Green PAC · Portland, Oregon USA.
        </p>

        <nav aria-label="Footer" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              style={{
                padding: "6px 10px",
                borderRadius: 999,
                fontWeight: 600,
                textDecoration: "none",
                color: "inherit",
                background: isActive(href) ? "rgba(0,0,0,.06)" : "transparent",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
