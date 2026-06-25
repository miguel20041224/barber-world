import type { Barber } from "@/domain/barber";
import type { BarberShop, BarberShopSlug } from "@/domain/barber-shop";
import type { BarberService } from "@/domain/service";

export type BarberShopDetails = {
  barberShop: BarberShop;
  services: BarberService[];
  barbers: Barber[];
};

export interface BarberShopRepository {
  findDetailsBySlug(slug: BarberShopSlug): Promise<BarberShopDetails | null>;
}
