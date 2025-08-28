// app/about/page.jsx
import Link from "next/link";
import Prose from "../../components/Prose";
import ArtBlock from "../../components/ArtBlock";
import DonateButton from "../../components/DonateButton";

export const metadata = {
  title: "About — Bright Green",
  description:
    "Who we are and why we’re building a people-powered Bright Green: innovation, preservation, and fairness.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="container" style={{ paddingBlock: "var(--s-12)" }}>
      {/* Visual anchor without heavy content */}
      <section aria-labelledby="about-heading" className="flow-2">
        <h1 id="about-heading">About Bright Green</h1>

        <ArtBlock
          image={{
            src: "/images/art/fist.avif",
            alt: "Bright Green art symbolizing people-powered action",
            focal: "center 35%",
            priority: false,
            sizes: "(min-width:1024px) 50vw, 92vw",
          }}
          imageSide="right"
          tone="card"
        >
          <Prose>
            <p className="muted">
              Bright Green PAC is powered by people who believe in innovation, preservation, and
              fairness. We support practical, optimistic action that improves everyday life and
              strengthens democracy.
            </p>
            <p>
              We focus on clear communication, pragmatic solutions, and building coalitions that
              can actually deliver results. If that sounds like you, we’d love your help.
            </p>
          </Prose>
        </ArtBlock>

        {/* Lightweight CTA row */}
        <div className="flow-1" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/volunteer" className="btn btn--secondary" aria-label="Volunteer with Bright Green">
            Volunteer
          </Link>
          <DonateButton variant="alt" dataAttrs={{ source: "about-cta" }} />
        </div>
      </section>
    </main>
  );
}
