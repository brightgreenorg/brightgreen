// app/volunteer/page.jsx
export const metadata = { title: "Volunteer", description: "Pitch in and help." };

const MAILTO = "mailto:brightgreenpac@gmail.com?subject=Volunteer%20Interest";

export default function Volunteer() {
  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>Volunteer</h1>
      <div className="prose">
        <p>We’re building a nimble list of helpers: writers, researchers, and organizers.</p>
      </div>

      <form action={MAILTO} method="post" style={{ maxWidth: 520, marginTop: 16 }}>
        <label className="label" htmlFor="name">Full name</label>
        <input id="name" className="input" name="name" required />

        <label className="label" htmlFor="email" style={{ marginTop: 12 }}>Email</label>
        <input id="email" type="email" className="input" name="email" required />

        <label className="label" htmlFor="notes" style={{ marginTop: 12 }}>How you’d like to help</label>
        <textarea id="notes" className="textarea" name="notes" rows={4} />

        <button className="btn btn--secondary" style={{ marginTop: 16 }} type="submit">
          Send
        </button>
      </form>
    </main>
  );
}
