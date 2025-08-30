// components/engagement-rail.jsx
import Link from "next/link";

export default function EngagementRail() {
  return (
    <aside
      aria-label="Ways to engage"
      style={{
        marginTop: "var(--s-12)",
        paddingTop: "var(--s-6)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <span className="muted" style={{ fontSize: 14 }}>Ways to engage:</span>
      <Link href="/volunteer" className="btn btn--secondary" aria-label="Become a volunteer">
        Volunteer
      </Link>
      <Link href="/donate" className="btn btn--primary" aria-label="Go to the Donate page">
        Donate
      </Link>
    </aside>
  );
}
