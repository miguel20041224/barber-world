import type {
  BarberShopDetails,
  BarberShopRepository
} from "@/application/ports/barber-shop-repository";
import { canReceiveBookings } from "@/domain/barber-shop";
import { isBookableService } from "@/domain/service";
import { failure, success, type Result } from "@/shared/result";

export type GetPublicBarberShopError = "not-found" | "inactive";

export async function getPublicBarberShop(
  repository: BarberShopRepository,
  slug: string
): Promise<Result<BarberShopDetails, GetPublicBarberShopError>> {
  const details = await repository.findDetailsBySlug(slug);

  if (!details) {
    return failure("not-found");
  }

  if (!canReceiveBookings(details.barberShop)) {
    return failure("inactive");
  }

  return success({
    ...details,
    services: details.services.filter(isBookableService),
    barbers: details.barbers.filter((barber) => barber.isActive)
  });
}
