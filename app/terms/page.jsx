// app/terms/page.jsx
export const metadata = {
  title: "Terms",
  description: "Simple terms for using this website.",
};

export default function TermsPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>Terms of Use</h1>
      <div className="prose">
        <p>
          By using this website you agree to do so lawfully and respectfully.
          Content is provided for general information. We may update content
          without notice.
        </p>
        <h2>Links</h2>
        <p>
          We link to external sites as a convenience. We are not responsible
          for their content or policies.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href="mailto:brightgreenpac@gmail.com">brightgreenpac@gmail.com</a>.
        </p>
      </div>
    </main>
  );
}
