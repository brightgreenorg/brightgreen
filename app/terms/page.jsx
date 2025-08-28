// app/terms/page.jsx
import Prose from "../../components/Prose";

export const metadata = {
  title: "Terms of Use — Bright Green",
  description: "Simple terms and conditions for using the Bright Green website.",
};

export default function TermsPage() {
  return (
    <main id="main-content" className="container u-section">
      <article className="u-card p-6 md:p-8 border border-[var(--border)]">
        <Prose>
          <h1>Terms of Use</h1>
          <p className="muted">Last updated: 2025-08-27</p>

          <h2>Acceptance of terms</h2>
          <p>
            By using this website, you agree to do so lawfully and respectfully. Content is provided
            for general information only and may be updated without notice.
          </p>

          <h2>Links</h2>
          <p>
            We provide links to external sites as a convenience. Bright Green is not responsible
            for the content, policies, or practices of external websites.
          </p>

          <h2>Use of content</h2>
          <p>
            Unless otherwise noted, content may be shared for non-commercial purposes with proper
            attribution. Commercial use requires prior written permission.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms? Email{" "}
            <a href="mailto:hello@brightgreen.org">hello@brightgreen.org</a>.
          </p>
        </Prose>
      </article>
    </main>
  );
}
