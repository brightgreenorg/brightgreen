// app/privacy/page.jsx
import Prose from "../../components/Prose";

export const metadata = {
  title: "Privacy Policy — Bright Green",
  description:
    "Our approach to privacy: what we collect, how we use it, and your choices.",
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="container u-section">
      <article className="u-card p-6 md:p-8 border border-[var(--border)]">
        <Prose>
          <h1>Privacy Policy</h1>
          <p className="muted">Last updated: 2025-08-27</p>

          <h2>Overview</h2>
          <p>
            We keep things simple: collect only what’s needed to run this site and improve our
            work, retain it only as long as necessary, and never sell your data.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Site analytics:</strong> basic usage metrics (pages visited, approximate device
              info) to understand site performance and interest.
            </li>
            <li>
              <strong>Contact/volunteer messages:</strong> details you choose to send when you reach out.
            </li>
            <li>
              <strong>Donations:</strong> handled by our payment processor; we receive the info required
              for receipts and compliance reporting.
            </li>
          </ul>

          <h2>How we use information</h2>
          <ul>
            <li>Operate, maintain, and improve the website.</li>
            <li>Respond to questions, volunteer interest, or media inquiries.</li>
            <li>Meet legal and reporting obligations related to contributions.</li>
          </ul>

          <h2>Sharing</h2>
          <p>
            We don’t sell personal data. We may share limited information with service providers
            (e.g., hosting, analytics, payment processors) and disclose where required by law.
          </p>

          <h2>Your choices</h2>
          <ul>
            <li>You can opt out of non-essential cookies where applicable.</li>
            <li>You may request updates or deletion where permitted by law.</li>
          </ul>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Email{" "}
            <a href="mailto:hello@brightgreen.org">hello@brightgreen.org</a>.
          </p>
        </Prose>
      </article>
    </main>
  );
}
