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

  const isActive = (href) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <footer className="border-t border-[var(--border)] mt-[var(--s-12)]">
      <div className="container py-6">
        <p className="muted text-sm">
          © {new Date().getFullYear()} Bright Green PAC · Portland, Oregon USA.
        </p>

        <nav
          aria-label="Footer"
          className="flex flex-wrap gap-3 mt-3 text-sm font-semibold"
        >
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={`px-2.5 py-1.5 rounded-full ${
                isActive(href) ? "bg-black/5" : "hover:bg-black/5"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
