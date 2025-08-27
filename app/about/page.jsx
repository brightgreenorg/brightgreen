export const metadata = {
  title: "About",
  description: "Who we are, what we believe, and how we work.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="u-section">
        <div className="u-container">
          <article className="u-card p-6 md:p-8">
            <div className="u-prose">
              <h1>About Bright Green</h1>
              <p>
                Bright Green PAC is a small, transparent committee focused on practical
                progress. We support leaders and ideas that advance innovation, fairness,
                and sustainability in everyday life.
              </p>
              <p>
                We value clear communication, data-informed decision making, and kindness.
                Our work will grow as volunteers and donors join in.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
