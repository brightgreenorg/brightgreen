// app/donate/page.jsx
export const metadata = {
  title: "Donate",
  description: "Back the work. Every dollar helps us support the right campaigns.",
};

const DONATE_URL = process.env.NEXT_PUBLIC_DONATE_URL || "https://secure.democracyengine.com/"; // replace if needed

export default function Donate() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>Donate</h1>
      <div className="prose">
        <p>
          Bright Green PAC is organized to support candidates and causes aligned
          with innovation, fairness, and sustainability under Oregon law.
        </p>
        <p>
          Contributions are not tax‑deductible. See our{" "}
          <a href="/compliance">compliance</a> page for details.
        </p>
      </div>
      <a className="btn btn--primary" href={DONATE_URL} style={{ marginTop: 16 }}>
        Give securely
      </a>
    </main>
  );
}
