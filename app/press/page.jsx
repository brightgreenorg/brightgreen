// app/press/page.jsx
export const metadata = {
  title: "Press",
  description: "Boilerplate, logo files, and contact for media inquiries.",
};

export default function PressPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>Press & Media</h1>
      <div className="prose">
        <p>
          For interviews or statements, email <a href="mailto:brightgreenpac@gmail.com">brightgreenpac@gmail.com</a>.
        </p>
        <h2>Boilerplate</h2>
        <p>
          Bright Green PAC supports candidates and policies that move communities
          toward a cleaner economy, fair elections, and climate resilience.
        </p>
        <h2>Logos</h2>
        <ul>
          <li><a href="/images/brand/bright-green-fullcolor.svg">Full color SVG</a></li>
          <li><a href="/images/brand/bright-green-white.svg">Reversed (white) SVG</a></li>
          <li><a href="/images/brand/bright-green-mono.svg">Monochrome SVG</a></li>
        </ul>
        <h2>One‑pager</h2>
        <p>
          See our brief overview in <a href="/site.webmanifest">site manifest</a> and
          the design tokens in <a href="/docs/Style.html">Style Guide</a>. A printable
          press kit PDF will be posted here soon.
        </p>
      </div>
    </main>
  );
}
