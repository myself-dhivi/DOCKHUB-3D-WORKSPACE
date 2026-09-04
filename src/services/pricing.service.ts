import "server-only";

import { cache } from "react";

import { mockPricingPlans, mockRooms } from "@/data/mock-workspace";
import type { PricingPlanView, RoomPricingView } from "@/types/pricing";

export const getPricingPlans = cache(async (): Promise<PricingPlanView[]> => {
  return mockPricingPlans
    .filter((plan) => plan.isActive)
    .sort((a, b) => a.period.localeCompare(b.period) || a.name.localeCompare(b.name));
});

function allRoomPricing(): RoomPricingView[] {
  return mockRooms
    .slice()
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .flatMap((room) => room.pricing);
}

export const getRoomPricing = cache(
  async (roomId: string): Promise<RoomPricingView[]> => {
    return allRoomPricing().filter(
      (record) => record.roomId === roomId && record.isActive,
    );
  },
);

export const getAllRoomPricing = cache(
  async (includeInactive = false): Promise<RoomPricingView[]> => {
    return allRoomPricing().filter(
      (record) => includeInactive || record.isActive,
    );
  },
);
