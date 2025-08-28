"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname() || "/";

  const nav = [
    { label: "Home", href: "/" },
    { label: "Issues", href: "/issues" },
    { label: "About", href: "/about" },
    { label: "Press", href: "/press" },
    { label: "Volunteer", href: "/volunteer" },
  ];

  const isActive = (href) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-[var(--black)] text-white border-b border-white/10">
      <div className="container flex items-center justify-between gap-3 py-3.5">
        <Link
          href="/"
          className="font-display font-extrabold text-lg tracking-wide text-white"
          aria-label="Bright Green PAC — Home"
        >
          Bright Green PAC
        </Link>

        <nav aria-label="Primary" className="flex flex-wrap gap-2">
          {nav.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-2 rounded-full font-semibold ${
                  active ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            );
          })}

          {/* CTA stays a button */}
          <Link href="/donate" className="btn btn--primary">
            Donate
          </Link>
        </nav>
      </div>
    </header>
  );
}
