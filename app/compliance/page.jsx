// app/compliance/page.jsx
import Prose from "../../components/Prose";

export const metadata = {
  title: "Compliance — Bright Green",
  description:
    "Contribution rules and important notices for supporting Bright Green PAC.",
};

export default function CompliancePage() {
  return (
    <main id="main-content" className="container u-section">
      <article className="u-card p-6 md:p-8 border border-[var(--border)]">
        <Prose>
          <h1>Compliance Information</h1>

          <p className="muted">
            Bright Green PAC operates under Oregon law. Contributions are not
            tax-deductible. Please give only from personal funds if required and
            follow all applicable limits and reporting rules.
          </p>

          <h2>Contribution rules</h2>
          <ul>
            <li>You must be a U.S. citizen or lawfully admitted permanent resident.</li>
            <li>Give from your own funds and not on behalf of another person.</li>
            <li>
              We may be required to publicly report contributor name, amount, and date if
              mandated by law.
            </li>
          </ul>

          <h2>Disclaimers</h2>
          <p className="muted">
            This site is for information only and is not legal advice. For legal questions,
            consult an attorney or the appropriate elections office.
          </p>

          <h2>Contact</h2>
          <p>
            For compliance questions, email{" "}
            <a href="mailto:brightgreenpac@gmail.com">brightgreenpac@gmail.com</a>.
          </p>
        </Prose>
      </article>
    </main>
  );
}
