// app/donate/page.jsx
import Link from "next/link";

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

        {/* Compliance — always visible, full text, no accordions */}
        <section
          id="compliance-text"
          aria-label="Required legal notice"
          className="prose"
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "var(--s-6)",
            color: "var(--muted)",
            fontSize: 14,
          }}
        >
          <p><strong>Compliance Notice</strong></p>
          <p>
            Federal law requires us to use our best efforts to collect and report the name, mailing
            address, occupation, and employer of each individual who contributes more than $200 in a
            calendar year.
          </p>
          <p>Contributions are not tax deductible for federal income tax purposes.</p>
          <p>By clicking “Donate,” you confirm that the following statements are true:</p>
          <ul>
            <li>You are a U.S. citizen or lawfully admitted permanent resident (green card holder).</li>
            <li>This contribution is made from your own funds, and not those of another.</li>
            <li>This contribution is not made from the funds of a corporation, labor organization, or national bank.</li>
            <li>You are not a federal contractor.</li>
            <li>You are at least 18 years old.</li>
          </ul>
          <p>
            <strong>Contribution limits:</strong> An individual may contribute up to $5,000 per
            calendar year to Bright Green PAC. Federal PACs may also contribute up to $5,000 per
            calendar year.
          </p>
          <p>
            Bright Green PAC may not accept contributions from corporations, labor organizations,
            federal government contractors, or foreign nationals (non-green card holders).
          </p>
        </section>
      </div>
    </main>
  );
}
