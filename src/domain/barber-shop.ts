export type BarberShopId = string;
export type BarberShopSlug = string;

export type BarberShopBranding = {
  name: string;
  tagline: string;
  logoUrl?: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
};

export type BarberShop = {
  id: BarberShopId;
  slug: BarberShopSlug;
  branding: BarberShopBranding;
  address: string;
  phone: string;
  isActive: boolean;
};

export function canReceiveBookings(barberShop: BarberShop): boolean {
  return barberShop.isActive;
}
