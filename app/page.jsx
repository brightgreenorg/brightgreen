// app/page.jsx
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Bright Green — A people-powered PAC",
  description: "Energy, optimism, and clarity. Join Bright Green to support innovation, fairness, and sustainability.",
};

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <section className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="grid" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
          <div className="flow-2">
            <h1>Let’s build a Bright Green future</h1>
            <p className="muted">
              Practical climate action, fair elections, and resilient communities.
              Help us support candidates and causes who move us forward.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" href="/donate">Donate</Link>
              <Link className="btn btn--secondary" href="/volunteer">Volunteer</Link>
              <Link className="btn btn--outline" href="/issues">Our Issues</Link>
            </div>
          </div>

          {/* Hero art container (scoped) */}
          <div className="rounded shadow hero-art">
            <Image
              src="/images/hero-desktop.avif"
              alt="Bright, optimistic Oregon scene"
              priority
              fill
              sizes="(min-width: 1024px) 33vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center 35%" }}
            />
          </div>
        </div>
      </section>

      {/* Three-up CTA */}
      <section className="container" style={{ paddingBottom: 48 }}>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}>
          <Card title="Clean Energy" href="/issues/clean-energy" />
          <Card title="Fair Elections" href="/issues/fair-elections" />
          <Card title="Climate Resilience" href="/issues/climate-resilience" />
        </div>
      </section>
    </main>
  );
}

function Card({ title, href }) {
  return (
    <div className="rounded shadow" style={{ border: "1px solid var(--border)", padding: 18 }}>
      <h3 style={{ color: "var(--ink)" }}>{title}</h3>
      <p className="muted">What we back and why it matters.</p>
      <a className="btn btn--alt" href={href} style={{ marginTop: 12 }}>Learn more</a>
    </div>
  );
}
