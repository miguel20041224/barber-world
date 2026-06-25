export type BarberId = string;

export type Barber = {
  id: BarberId;
  barberShopId: string;
  displayName: string;
  bio: string;
  avatarUrl?: string;
  isActive: boolean;
};
