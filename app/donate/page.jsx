// app/donate/page.jsx
import Link from "next/link";
import ComplianceNotice from "@/components/compliance-notice";

const DONATE_URL =
  process.env.NEXT_PUBLIC_DONATE_URL ||
  "https://secure.democracyengine.com/brightgreen/"; // fallback if env not set

export const metadata = {
  title: "Donate • Bright Green",
  description:
    "Support Bright Green’s fairness-first work. Transparent, values-driven, and community-powered.",
};

export default function DonatePage() {
  return (
    <main className="u-section">
      <div className="container" style={{ maxWidth: 880 }}>
        {/* Values intro */}
        <header className="flow-2" style={{ marginBottom: "var(--s-8)" }}>
          <h1>Donate</h1>
          <p className="muted">
            Your contribution helps us build practical, fairness-first solutions and broaden participation.
          </p>
        </header>

        {/* Contribution actions */}
        <section className="flow-2" style={{ marginBottom: "var(--s-12)" }}>
          <a
            href={DONATE_URL}
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-describedby="compliance-text"
          >
            Donate via Democracy Engine
          </a>

          {/* Secondary engagement paths (subtle) */}
          <div style={{ display: "flex", gap: 14, marginTop: 12, flexWrap: "wrap" }}>
            <Link href="/volunteer" className="btn btn--secondary" aria-label="Become a volunteer">
              Become a volunteer
            </Link>
            <Link href="/about" className="btn btn--outline" aria-label="Learn more about Bright Green">
              Learn more
            </Link>
          </div>
        </section>

        {/* Compliance — componentized for easy future swap */}
        <ComplianceNotice />
      </div>
    </main>
  );
}
