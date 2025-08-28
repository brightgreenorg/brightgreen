// app/contact/page.jsx
import Link from "next/link";
import Prose from "../../components/Prose";
import DonateButton from "../../components/DonateButton";

export const metadata = {
  title: "Contact — Bright Green",
  description:
    "Get in touch with Bright Green for questions, volunteering, or media inquiries.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="container" style={{ paddingBlock: "var(--s-12)" }}>
      <section aria-labelledby="contact-heading" className="flow-2">
        <h1 id="contact-heading">Contact</h1>

        <Prose>
          <p className="muted">
            We’d love to hear from you. Choose the option that fits and we’ll get back to you.
          </p>

          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:hello@brightgreen.org">hello@brightgreen.org</a>
            </li>
            <li>
              <strong>Media:</strong>{" "}
              <Link href="/press">press resources &amp; inquiries</Link>
            </li>
            <li>
              <strong>Volunteer:</strong>{" "}
              <Link href="/volunteer">raise your hand to help</Link>
            </li>
            <li>
              <strong>Donate:</strong>{" "}
              <Link href="/donate">support the work</Link>
            </li>
          </ul>
        </Prose>

        {/* Quick action row */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="mailto:hello@brightgreen.org" className="btn btn--secondary" aria-label="Email Bright Green">
            Email us
          </a>
          <DonateButton variant="alt" dataAttrs={{ source: "contact-cta" }} />
        </div>
      </section>
    </main>
  );
}
