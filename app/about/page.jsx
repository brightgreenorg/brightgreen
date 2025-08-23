// app/about/page.jsx
export const metadata = {
  title: "About",
  description: "Who we are, what we believe, and how we work.",
};

export default function AboutPage() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>About Bright Green</h1>
      <div className="prose">
        <p>
          Bright Green PAC is a small, transparent committee focused on practical
          progress. We support leaders and ideas that advance innovation, fairness,
          and sustainability in everyday life.
        </p>
        <p>
          We value clear communication, data‑informed decision making, and kindness.
          Our work will grow as volunteers and donors join in.
        </p>
      </div>
    </main>
  );
}
