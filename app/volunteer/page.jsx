// app/volunteer/page.jsx
import Link from "next/link";
import Prose from "../../components/Prose";
import ArtBlock from "../../components/ArtBlock";
import DonateButton from "../../components/DonateButton";

export const metadata = {
  title: "Volunteer — Bright Green",
  description:
    "Pitch in with Bright Green. Help with outreach, content, events, and tech—whatever fits your skills and time.",
};

export default function VolunteerPage() {
  return (
    <main id="main-content" className="container" style={{ paddingBlock: "var(--s-12)" }}>
      <section aria-labelledby="volunteer-heading" className="flow-2">
        <h1 id="volunteer-heading">Volunteer</h1>

        {/* Optional visual anchor to keep the page from feeling bare */}
        <ArtBlock
          image={{
            src: "/images/art/fist.avif",
            alt: "Hands raised together for community action",
            focal: "center 35%",
            sizes: "(min-width:1024px) 50vw, 92vw",
          }}
          imageSide="left"
          tone="card"
        >
          <Prose>
            <p className="muted">
              Bright Green is people-powered. Whether you have an hour a month or time every week,
              there’s a way to make a difference.
            </p>
            <ul>
              <li><strong>Outreach:</strong> tabling, door-to-door, or digital engagement</li>
              <li><strong>Content:</strong> writing, editing, social media, design</li>
              <li><strong>Events:</strong> planning, setup, and on-site support</li>
              <li><strong>Tech:</strong> site QA, data cleanup, light automations</li>
            </ul>
            <p>
              Tell us what you enjoy and the time you have—we’ll match you with a small, concrete
              task to start.
            </p>
          </Prose>
        </ArtBlock>

        {/* CTA row */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/contact" className="btn btn--secondary" aria-label="Contact Bright Green to volunteer">
            I’m in — Contact us
          </Link>
          <DonateButton variant="alt" dataAttrs={{ source: "volunteer-cta" }} />
        </div>
      </section>
    </main>
  );
}
