// app/about/page.jsx
import EngagementRail from "@/components/engagement-rail";

export const metadata = {
  title: "About • Bright Green",
  description:
    "Who we are, what we stand for, and how we work — innovation, preservation, and fairness.",
};

export default function AboutPage() {
  return (
    <main className="u-section">
      <div className="container">
        <header className="flow-2" style={{ marginBottom: "var(--s-8)" }}>
          <h1>About</h1>
          <p className="muted">
            Bright Green is a fairness-principled civic project focused on practical solutions and broad participation.
          </p>
        </header>

        {/* TODO: keep or replace with your existing About content/MDX as needed */}
        <section className="prose">
          <p>
            We’re building a transparent, values-driven effort that invites everyone to contribute —
            whether through time, ideas, or donations. Our organizing principles are innovation,
            preservation, and fairness.
          </p>
        </section>

        {/* Subtle end-cap */}
        <EngagementRail />
      </div>
    </main>
  );
}
