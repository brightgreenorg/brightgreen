// components/Hero.jsx
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero hero--home rounded shadow">
      <div className="hero__inner container">
        <div className="hero__copy flow-2">
          <h1>Bright Green for a livable future</h1>
          <p className="muted">
            Energy, optimism, and action. Join us to accelerate practical climate solutions and fair elections.
          </p>
          <div className="hero__cta">
            <Link href="/donate" className="btn btn--primary">
              Donate
            </Link>
            <Link href="/volunteer" className="btn btn--secondary">
              Volunteer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
