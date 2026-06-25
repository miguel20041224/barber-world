import type { CSSProperties } from "react";
import { getPublicBarberShop } from "@/application/get-public-barber-shop";
import { InMemoryBarberShopRepository } from "@/infrastructure/in-memory-barber-shop-repository";

type PageProps = {
  params: Promise<{
    shopSlug: string;
  }>;
};

export default async function PublicShopPage({ params }: PageProps) {
  const { shopSlug } = await params;
  const result = await getPublicBarberShop(
    new InMemoryBarberShopRepository(),
    shopSlug
  );

  if (!result.ok) {
    return (
      <main className="home-shell">
        <section className="hero-card">
          <p className="eyebrow">BarberOS</p>
          <h1>Shop unavailable</h1>
          <p>This barber shop is not accepting bookings right now.</p>
        </section>
      </main>
    );
  }

  const { barberShop, services, barbers } = result.value;
  const branding = barberShop.branding;

  return (
    <main
      className="shop-shell"
      style={
        {
          "--brand": branding.primaryColor,
          "--surface": branding.backgroundColor,
          "--text": branding.textColor
        } as CSSProperties
      }
    >
      <section className="shop-hero" aria-labelledby="shop-title">
        <p className="eyebrow">Book appointment</p>
        <h1 id="shop-title">{branding.name}</h1>
        <p>{branding.tagline}</p>
        <address>
          {barberShop.address} · {barberShop.phone}
        </address>
      </section>

      <section className="content-grid" aria-label="Booking options">
        <div className="panel">
          <h2>Services</h2>
          <div className="stack">
            {services.map((service) => (
              <article className="item-card" key={service.id}>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <strong>{service.priceLabel}</strong>
              </article>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2>Barbers</h2>
          <div className="stack">
            {barbers.map((barber) => (
              <article className="item-card" key={barber.id}>
                <div>
                  <h3>{barber.displayName}</h3>
                  <p>{barber.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="panel booking-panel" aria-labelledby="booking-title">
        <h2 id="booking-title">Request an appointment</h2>
        <form className="booking-form">
          <label>
            Full name
            <input name="customerName" autoComplete="name" required />
          </label>
          <label>
            Phone number
            <input name="customerPhone" autoComplete="tel" required />
          </label>
          <label>
            Preferred date
            <input name="preferredDate" type="date" required />
          </label>
          <button type="submit">Request appointment</button>
        </form>
      </section>
    </main>
  );
}
