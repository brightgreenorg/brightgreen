// components/Hero.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      className="hero rounded shadow"
      style={{ position: 'relative', minHeight: 'clamp(420px, 72vh, 760px)', overflow: 'hidden' }}
    >
      {/* Critical: fill + objectFit cover (NO width/height props) */}
      <Image
        src="/images/hero-desktop.jpg"
        alt="Bright, optimistic Oregon scene"
        priority
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
      />

      {/* Brand overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(126,217,87,.28), rgba(244,208,63,.24))',
          pointerEvents: 'none'
        }}
      />

      <div className="container hero__inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero__copy flow-2" style={{ maxWidth: '60ch' }}>
          <h1>Bright Green for a livable future</h1>
          <p className="muted">
            Energy, optimism, and action. Join us to accelerate practical climate solutions and fair elections.
          </p>
          <div className="hero__cta" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/donate" className="btn btn--primary">Donate</Link>
            <Link href="/volunteer" className="btn btn--secondary">Volunteer</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
