# BarberOS

Private white-label booking platform for barber shops.

BarberOS helps each barber shop offer its own appointment page through a QR code or direct link, while keeping administration private per shop.

## Product direction

- Not a public marketplace in the first version.
- Each barber shop has its own branded page.
- Customers book appointments without WhatsApp friction.
- Payments happen in person for the first version.
- The platform is designed to be reusable across multiple barber shops.

## Initial architecture

```txt
src/
├─ app/              # Next.js routes and UI composition
├─ domain/           # Business entities and rules
├─ application/      # Use cases and ports
├─ infrastructure/   # Persistence, external services, adapters
└─ shared/           # Shared primitives
```

The domain does not depend on Next.js, databases, or UI code. That is intentional: business rules should survive framework changes.

## First slice

- Public barber shop page by slug
- Services listing
- Barber listing
- Appointment request form
- Admin-ready tenant model
- Branding model for logo, colors, title, and description

## Development

```bash
npm install
npm run dev
```
