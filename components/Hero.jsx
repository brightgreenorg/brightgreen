import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero hero--full hero--on-photo">
      {/* Full-bleed image */}
      <Image
        src="/images/hero-desktop.jpg"
        alt="Bright, optimistic Oregon scene"
        priority
        fill
        sizes="100vw"
      />

      {/* Bottom-only fade */}
      <div className="hero__fade" aria-hidden="true" />

      {/* Split layout */}
      <div className="container hero__inner hero__inner--split relative z-10">
        <div className="hero__copy flow-2 max-w-[60ch]">
          <h1>Bright Green for a livable future</h1>
          <p className="muted">
            Energy, optimism, and action. Join us to accelerate practical climate
            solutions and fair elections.
          </p>
        </div>

        <div className="hero__spacer" aria-hidden="true" />

        <div className="hero__cta">
          <Link href="/donate" className="btn btn--primary">
            Donate
          </Link>
          <Link href="/volunteer" className="btn btn--secondary">
            Volunteer
          </Link>
        </div>
      </div>
    </section>
  );
}
