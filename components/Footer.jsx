// components/Footer.jsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ borderTop: "1px solid var(--border)", marginTop: "var(--s-16)" }}>
      <div className="container" style={{ paddingBlock: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>© {new Date().getFullYear()} Bright Green</p>

        {/* Equal-weight small links; no oversized primary here */}
        <nav aria-label="Footer" style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 14 }}>
          <Link href="/donate">Donate</Link>
          <span aria-hidden="true">·</span>
          <Link href="/volunteer">Volunteer</Link>
          <span aria-hidden="true">·</span>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
