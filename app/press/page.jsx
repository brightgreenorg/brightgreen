// app/about/page.jsx  (repeat pattern for others, edit title/desc/body)
export const metadata = { title: "About", description: "Who we are and how we work." };
export default function About() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>About Bright Green</h1>
      <div className="prose">
        <p>Bright Green PAC advocates for innovation, fairness, and sustainability.</p>
      </div>
    </main>
  );
}
