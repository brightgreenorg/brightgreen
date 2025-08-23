// app/compliance/page.jsx
export const metadata = {
  title: "Compliance",
  description: "Contribution information and important notices.",
};

export default function CompliancePage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>Compliance Information</h1>
      <div className="prose">
        <p>
          Bright Green PAC operates under Oregon law. Contributions are not
          tax‑deductible. Please give only from personal funds if required and
          follow all applicable limits and reporting rules.
        </p>
        <h2>Contribution rules</h2>
        <ul>
          <li>You must be a U.S. citizen or lawfully admitted permanent resident.</li>
          <li>Give from your own funds and not on behalf of another person.</li>
          <li>We may publicly report contributor name, amount, and date if required by law.</li>
        </ul>
        <h2>Disclaimers</h2>
        <p>
          This site is for information only and is not legal advice. For legal
          questions, consult an attorney or the appropriate elections office.
        </p>
        <h2>Contact</h2>
        <p>
          For compliance questions, email{" "}
          <a href="mailto:brightgreenpac@gmail.com">brightgreenpac@gmail.com</a>.
        </p>
      </div>
    </main>
  );
}
