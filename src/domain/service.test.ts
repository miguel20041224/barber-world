import { describe, expect, it } from "vitest";
import { isBookableService, type BarberService } from "@/domain/service";

const baseService: BarberService = {
  id: "service_haircut",
  barberShopId: "shop_demo",
  name: "Haircut",
  description: "Classic haircut",
  durationMinutes: 45,
  priceLabel: "$40.000",
  isActive: true
};

describe("isBookableService", () => {
  it("allows active services with positive duration", () => {
    expect(isBookableService(baseService)).toBe(true);
  });

  it("rejects inactive services", () => {
    expect(isBookableService({ ...baseService, isActive: false })).toBe(false);
  });

  it("rejects services without a valid duration", () => {
    expect(isBookableService({ ...baseService, durationMinutes: 0 })).toBe(false);
  });
});
