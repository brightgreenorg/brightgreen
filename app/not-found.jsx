// app/not-found.jsx
import Link from "next/link";

export const metadata = {
  title: "Page Not Found — Bright Green PAC",
  description:
    "Sorry, we couldn’t find that page. Explore Bright Green’s mission, issues, and ways to get involved.",
};

export default function NotFound() {
  return (
    <main className="container u-section">
      <article className="u-card p-8 md:p-10 border border-[var(--border)]">
        {/* Brand-y illustration (inline SVG uses core palette) */}
        <div
          aria-hidden="true"
          className="rounded mx-auto mb-4 flex items-center justify-center"
          style={{
            width: 96,
            height: 96,
            background:
              "linear-gradient(135deg, var(--lime) 0%, var(--yellow) 100%)",
            boxShadow: "var(--shadow)",
          }}
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 64 64"
            role="img"
            aria-label="Sunrise icon"
          >
            <defs>
              <linearGradient id="grad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--lime)" />
                <stop offset="100%" stopColor="var(--violet)" />
              </linearGradient>
            </defs>
            <circle cx="32" cy="36" r="14" fill="url(#grad)" />
            <g stroke="url(#grad)" strokeWidth="3" strokeLinecap="round">
              <line x1="32" y1="6" x2="32" y2="16" />
              <line x1="12" y1="14" x2="20" y2="22" />
              <line x1="52" y1="14" x2="44" y2="22" />
              <line x1="6" y1="36" x2="16" y2="36" />
              <line x1="48" y1="36" x2="58" y2="36" />
            </g>
            <rect x="4" y="44" width="56" height="4" rx="2" fill="url(#grad)" />
          </svg>
        </div>

        <div className="u-prose text-center">
          <h1 id="nf-title">We can’t find that page</h1>
          <p className="muted max-w-[60ch] mx-auto">
            The link may be broken or the page may have moved. Let’s get you back
            to something good—donations, volunteering, or our current issues.
          </p>
        </div>

        {/* Action row */}
        <div className="flow-1 mt-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/" className="btn btn--primary">
              Back to Home
            </Link>
            <Link href="/donate" className="btn btn--secondary">
              Donate
            </Link>
            <Link href="/issues" className="btn btn--outline">
              Explore Issues
            </Link>
            <Link href="/volunteer" className="btn btn--alt">
              Volunteer
            </Link>
          </div>

          {/* Helpful links list for A11y + navigation */}
          <nav
            aria-label="Popular destinations"
            className="mt-4 text-left text-[var(--muted)]"
          >
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <Link href="/about">About Bright Green</Link>
              </li>
              <li>
                <Link href="/press">Press &amp; Media Kit</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </article>
    </main>
  );
}
