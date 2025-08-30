// components/compliance-notice.jsx
export default function ComplianceNotice() {
  return (
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
        <strong>Contribution limits:</strong> An individual may contribute up to $5,000 per calendar
        year to Bright Green PAC. Federal PACs may also contribute up to $5,000 per calendar year.
      </p>
      <p>
        Bright Green PAC may not accept contributions from corporations, labor organizations, federal
        government contractors, or foreign nationals (non-green card holders).
      </p>
    </section>
  );
}
