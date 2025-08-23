// app/contact/page.jsx
export const metadata = {
  title: "Contact",
  description: "Reach out with questions or ideas.",
};

const MAILTO = "mailto:brightgreenpac@gmail.com?subject=Hello%20from%20the%20site";

export default function ContactPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>Contact</h1>
      <div className="prose">
        <p>
          We welcome thoughtful feedback, collaboration ideas, and questions.
          Email us directly or use the button below.
        </p>
      </div>
      <a className="btn btn--secondary" href={MAILTO} style={{ marginTop: 16 }}>
        Email Bright Green
      </a>
    </main>
  );
}
