// REPLACE FILE: components/Hero.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      className="hero hero--full hero--on-photo"
      style={{ position: 'relative', minHeight: 'clamp(420px, 72vh, 800px)', overflow: 'hidden' }}
    >
      {/* Full-bleed image */}
      <Image
        src="/images/hero-desktop.jpg"
        alt="Bright, optimistic Oregon scene"
        priority
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
      />

      {/* Bottom-only fade to preserve image vibrancy while boosting readability */}
      <div className="hero__fade" aria-hidden="true" />

      {/* Split layout: headline/lede up top, CTAs anchored lower */}
      <div className="container hero__inner hero__inner--split" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero__copy flow-2" style={{ maxWidth: '60ch' }}>
          <h1>Bright Green for a livable future</h1>
          <p className="muted">
            Energy, optimism, and action. Join us to accelerate practical climate solutions and fair elections.
          </p>
        </div>

        <div className="hero__spacer" aria-hidden="true" />

        <div className="hero__cta" style={{ display: 'flex', gap: 12 }}>
          <Link href="/donate" className="btn btn--primary">Donate</Link>
          <Link href="/volunteer" className="btn btn--secondary">Volunteer</Link>
        </div>
      </div>
    </section>
  );
}
