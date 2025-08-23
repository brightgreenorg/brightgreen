// app/privacy/page.jsx
export const metadata = {
  title: "Privacy",
  description: "How we handle information on this website.",
};

export default function PrivacyPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>Privacy Policy</h1>
      <div className="prose">
        <p>
          We collect only the information needed to operate this website and
          improve it over time. If you contact us, we will use your message
          solely to respond and to manage our communications.
        </p>
        <h2>Cookies and analytics</h2>
        <p>
          We may use basic analytics to understand site traffic. You can block
          cookies in your browser if you prefer.
        </p>
        <h2>Third‑party services</h2>
        <p>
          Donation processing is handled by a trusted provider. Please review
          their posted terms and privacy notices when you use those pages.
        </p>
        <h2>Questions</h2>
        <p>
          Email <a href="mailto:brightgreenpac@gmail.com">brightgreenpac@gmail.com</a>.
        </p>
      </div>
    </main>
  );
}
