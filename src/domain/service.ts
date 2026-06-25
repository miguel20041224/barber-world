export type ServiceId = string;

export type BarberService = {
  id: ServiceId;
  barberShopId: string;
  name: string;
  description: string;
  durationMinutes: number;
  priceLabel: string;
  isActive: boolean;
};

export function isBookableService(service: BarberService): boolean {
  return service.isActive && service.durationMinutes > 0;
}
