// app/donate/page.jsx
import Prose from "../../components/Prose";
import DonateButton from "../../components/DonateButton";

export const metadata = {
  title: "Donate — Bright Green",
  description:
    "Back the work. Every dollar helps us support the right campaigns and causes.",
};

export default function DonatePage() {
  return (
    <main id="main-content" className="container u-section">
      <article className="u-card p-6 md:p-8 border border-[var(--border)] flow-2">
        <Prose>
          <h1>Donate</h1>
          <p className="muted">
            Bright Green PAC is organized to support candidates and causes aligned with
            innovation, preservation, and fairness under Oregon law.
          </p>
          <p>
            Contributions are not tax-deductible. See our{" "}
            <a href="/compliance">compliance</a> page for details.
          </p>
        </Prose>

        {/* Primary donate button */}
        <DonateButton variant="primary" dataAttrs={{ source: "donate-page-main" }} />

        {/* Alt preset options */}
        <div className="flow-1" style={{ marginTop: "var(--s-6)" }}>
          <DonateButton variant="alt" dataAttrs={{ amount: "10", source: "donate-10" }}>
            Give $10
          </DonateButton>
          <DonateButton variant="alt" dataAttrs={{ amount: "25", source: "donate-25" }}>
            Give $25
          </DonateButton>
          <DonateButton variant="alt" dataAttrs={{ amount: "50", source: "donate-50" }}>
            Give $50
          </DonateButton>
        </div>

        {/* Compliance small-print */}
        <p className="muted" style={{ marginTop: "var(--s-8)", fontSize: 14 }}>
          Contributions are subject to reporting and limits. Bright Green PAC may be
          required to publicly disclose donor name, city, state, occupation, employer,
          and amount. Contributions are not tax-deductible.
        </p>
      </article>
    </main>
  );
}
