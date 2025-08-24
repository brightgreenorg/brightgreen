// app/page.jsx
import Image from "next/image";
import Link from "next/link";
import { getIssues } from "../lib/getIssues";
import Hero from "../components/Hero";

export const metadata = {
  title: "Bright Green — A people-powered PAC",
  description:
    "Energy, optimism, and clarity. Join Bright Green to support innovation, fairness, and sustainability.",
};

export default async function HomePage() {
  // Pull latest issues from /content/issues (sorted by date in the helper)
  const issues = await getIssues({ limit: 3 });

  return (
    <>
      {/* Full‑bleed hero with above‑the‑fold CTAs */}
      <Hero />

      {/* Main content (target for SkipNav) */}
      <main id="main-content">
        {/* Mission / Together we Rise (between Hero and Issues) */}
        <section
          id="mission"
          aria-labelledby="rise-heading"
          className="container"
          style={{ paddingTop: "var(--s-12)", paddingBottom: "var(--s-12)" }}
        >
          <div
            className="grid"
            style={{
              alignItems: "center",
              gridTemplateColumns: "1.1fr 0.9fr",
            }}
          >
            {/* Copy */}
            <div className="flow-2" style={{ maxWidth: "60ch" }}>
              <h2 id="rise-heading">Together we Rise</h2>
              <p className="muted">
                Bright Green PAC is powered by people who believe in innovation, fairness, and
                sustainability. Together, we rise to build a livable, just future — block by block,
                vote by vote.
              </p>

              {/* Optional mini‑pillars */}
              <ul className="muted" style={{ marginTop: "var(--s-4)", paddingLeft: "1.25rem" }}>
                <li>
                  <strong>Innovation</strong> — practical tech that serves people
                </li>
                <li>
                  <strong>Preservation</strong> — protect what makes communities thrive
                </li>
                <li>
                  <strong>Fairness</strong> — rules that include everyone
                </li>
              </ul>
            </div>

            {/* Image */}
            <div
              className="rounded shadow"
              style={{
                border: "1px solid var(--border)",
                justifySelf: "stretch",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/art/fist.avif"
                alt="Raised fist with leaf motif symbolizing collective climate action"
                width={960}
                height={1200}
                loading="lazy"
                sizes="(min-width:1024px) 460px, (min-width:768px) 50vw, 92vw"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </section>

        {/* Issues pulled from Markdown (sorted by date) */}
        <section className="container" style={{ paddingBlock: 48 }}>
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}
          >
            {issues.length > 0 ? (
              issues.map((issue) => (
                <article
                  key={issue.slug}
                  className="rounded shadow"
                  style={{ border: "1px solid var(--border)", padding: 18 }}
                >
                  <h3 style={{ color: "var(--ink)" }}>{issue.title}</h3>
                  <p className="muted">{issue.summary}</p>
                  <Link
                    className="btn btn--alt"
                    href={`/issues/${issue.slug}`}
                    style={{ marginTop: 12 }}
                  >
                    Learn more
                  </Link>
                </article>
              ))
            ) : (
              <p className="muted">
                No issues found. Add markdown files to <code>/content/issues</code> with a
                <code> date:</code> in the frontmatter (YYYY-MM-DD).
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
