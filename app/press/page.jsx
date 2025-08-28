// app/press/page.jsx
import Link from "next/link";
import Prose from "../../components/Prose";

export const metadata = {
  title: "Press — Bright Green",
  description:
    "News, interviews, and resources about Bright Green. For media inquiries, get in touch any time.",
};

const pressItems = [
  // TODO: Replace with real links as they publish.
  // Example item:
  // {
  //   title: "Bright Green launches a people-powered climate effort",
  //   outlet: "Local News",
  //   href: "https://example.com/article",
  //   date: "2025-08-15",
  // },
];

export default function PressPage() {
  return (
    <main id="main-content" className="container" style={{ paddingBlock: "var(--s-12)" }}>
      <section aria-labelledby="press-heading" className="flow-2">
        <h1 id="press-heading">Press</h1>

        {/* Brief intro */}
        <Prose>
          <p className="muted">
            Coverage and updates about Bright Green. For interviews or background, reach out — we’re happy
            to help.
          </p>
        </Prose>

        {/* Card list */}
        {pressItems.length > 0 ? (
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
            aria-label="Press coverage"
          >
            {pressItems.map((item, i) => (
              <article
                key={`${item.href}-${i}`}
                className="rounded shadow"
                style={{
                  border: "1px solid var(--border)",
                  background: "#fff",
                  padding: "16px",
                }}
              >
                <h3 style={{ marginBottom: 6 }}>
                  <Link href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </Link>
                </h3>
                <p className="muted" style={{ marginBottom: 10 }}>
                  {item.outlet}
                  {item.date ? ` · ${new Date(item.date).toLocaleDateString()}` : ""}
                </p>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                  aria-label={`Read: ${item.title}`}
                >
                  Read
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p className="muted" aria-live="polite">
            Press clips will appear here as they’re published.
          </p>
        )}

        {/* Media inquiries CTA */}
        <div style={{ marginTop: "var(--s-8)" }}>
          <Link href="/contact" className="btn btn--secondary" aria-label="Contact Bright Green for media inquiries">
            Media inquiries
          </Link>
        </div>
      </section>
    </main>
  );
}
