import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-shell">
      <section className="hero-card">
        <p className="eyebrow">BarberOS</p>
        <h1>Private booking pages for modern barber shops.</h1>
        <p>
          Give each shop its own branded appointment page so customers can book
          without waiting on WhatsApp.
        </p>
        <Link className="button" href="/demo">
          View demo shop
        </Link>
      </section>
    </main>
  );
}
