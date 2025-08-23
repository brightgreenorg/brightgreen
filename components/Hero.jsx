// components/Hero.jsx
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section
      className="rounded shadow"
      style={{ position: 'relative', minHeight: 'clamp(420px, 72vh, 760px)', overflow: 'hidden' }}
    >
      {/* Covered background image via Next Image */}
      <Image
        src="/images/hero-desktop.jpg"
        alt=""
        priority
        fill
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
      />

      {/* Optional brand overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(126,217,87,.28), rgba(244,208,63,.24))',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{ position: 'relative', zIndex: 1, minHeight: 'inherit', display: 'grid', alignItems: 'center', paddingBlock: '64px' }}
      >
        <div style={{ maxWidth: '60ch' }}>
          <h1>Bright Green for a livable future</h1>
          <p className="muted">
            Energy, optimism, and action. Join us to accelerate practical climate solutions and fair elections.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/donate" className="btn btn--primary">Donate</Link>
            <Link href="/volunteer" className="btn btn--secondary">Volunteer</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
