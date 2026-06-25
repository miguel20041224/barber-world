import type {
  BarberShopDetails,
  BarberShopRepository
} from "@/application/ports/barber-shop-repository";

const demoShop: BarberShopDetails = {
  barberShop: {
    id: "shop_demo",
    slug: "demo",
    address: "Main Street 123",
    phone: "+57 300 000 0000",
    isActive: true,
    branding: {
      name: "BarberOS Demo",
      tagline: "Book your next cut without waiting on chat.",
      primaryColor: "#d4af37",
      backgroundColor: "#111111",
      textColor: "#f7f2e8"
    }
  },
  services: [
    {
      id: "service_haircut",
      barberShopId: "shop_demo",
      name: "Haircut",
      description: "Classic or modern haircut with finishing.",
      durationMinutes: 45,
      priceLabel: "$40.000",
      isActive: true
    },
    {
      id: "service_beard",
      barberShopId: "shop_demo",
      name: "Beard trim",
      description: "Shape, trim, and detail work.",
      durationMinutes: 30,
      priceLabel: "$25.000",
      isActive: true
    }
  ],
  barbers: [
    {
      id: "barber_juan",
      barberShopId: "shop_demo",
      displayName: "Juan",
      bio: "Specialist in fades and beard styling.",
      isActive: true
    },
    {
      id: "barber_mateo",
      barberShopId: "shop_demo",
      displayName: "Mateo",
      bio: "Classic cuts and premium grooming.",
      isActive: true
    }
  ]
};

export class InMemoryBarberShopRepository implements BarberShopRepository {
  async findDetailsBySlug(slug: string): Promise<BarberShopDetails | null> {
    if (slug !== demoShop.barberShop.slug) {
      return null;
    }

    return demoShop;
  }
}
