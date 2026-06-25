import { describe, expect, it } from "vitest";
import { getPublicBarberShop } from "@/application/get-public-barber-shop";
import type {
  BarberShopDetails,
  BarberShopRepository
} from "@/application/ports/barber-shop-repository";

const details: BarberShopDetails = {
  barberShop: {
    id: "shop_demo",
    slug: "demo",
    address: "Main Street 123",
    phone: "+57 300 000 0000",
    isActive: true,
    branding: {
      name: "Demo Shop",
      tagline: "Book faster",
      primaryColor: "#d4af37",
      backgroundColor: "#111111",
      textColor: "#f7f2e8"
    }
  },
  services: [
    {
      id: "service_active",
      barberShopId: "shop_demo",
      name: "Haircut",
      description: "Classic haircut",
      durationMinutes: 45,
      priceLabel: "$40.000",
      isActive: true
    },
    {
      id: "service_inactive",
      barberShopId: "shop_demo",
      name: "Hidden service",
      description: "Should not appear",
      durationMinutes: 30,
      priceLabel: "$10.000",
      isActive: false
    }
  ],
  barbers: [
    {
      id: "barber_active",
      barberShopId: "shop_demo",
      displayName: "Juan",
      bio: "Fade specialist",
      isActive: true
    },
    {
      id: "barber_inactive",
      barberShopId: "shop_demo",
      displayName: "Hidden Barber",
      bio: "Should not appear",
      isActive: false
    }
  ]
};

function repositoryWith(value: BarberShopDetails | null): BarberShopRepository {
  return {
    async findDetailsBySlug() {
      return value;
    }
  };
}

describe("getPublicBarberShop", () => {
  it("returns not-found when the shop slug does not exist", async () => {
    const result = await getPublicBarberShop(repositoryWith(null), "missing");

    expect(result).toEqual({ ok: false, error: "not-found" });
  });

  it("returns inactive when the shop cannot receive bookings", async () => {
    const result = await getPublicBarberShop(
      repositoryWith({
        ...details,
        barberShop: { ...details.barberShop, isActive: false }
      }),
      "demo"
    );

    expect(result).toEqual({ ok: false, error: "inactive" });
  });

  it("returns only public bookable services and active barbers", async () => {
    const result = await getPublicBarberShop(repositoryWith(details), "demo");

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.value.services).toHaveLength(1);
    expect(result.value.services[0]?.id).toBe("service_active");
    expect(result.value.barbers).toHaveLength(1);
    expect(result.value.barbers[0]?.id).toBe("barber_active");
  });
});
