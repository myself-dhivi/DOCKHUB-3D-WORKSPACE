import "server-only";

import { cache } from "react";

import { mockPassPlans, mockRooms } from "@/data/mock-workspace";
import type { AdminSummaryView, WorkspaceSummaryView } from "@/types/room";

export const getWorkspaceSummary = cache(
  async (): Promise<WorkspaceSummaryView> => {
    const publicRooms = mockRooms.filter((room) => room.status !== "INACTIVE");
    const bookableRooms = mockRooms.filter(
      (room) => room.status === "AVAILABLE" || room.status === "PRE_BOOKING",
    );

    const totalCapacity = bookableRooms.reduce(
      (sum, room) => sum + room.capacity,
      0,
    );
    const availableSpaces = mockRooms.filter(
      (room) => room.status === "AVAILABLE",
    ).length;
    const preBookingSpaces = mockRooms.filter(
      (room) => room.status === "PRE_BOOKING",
    ).length;

    const activePricing = mockRooms
      .flatMap((room) => room.pricing)
      .filter((record) => record.isActive);
    const monetaryValues = activePricing.flatMap((record) => [
      record.preBookingPrice,
      record.offerPrice,
      record.regularPrice,
    ]);
    const prices = monetaryValues.filter(
      (value): value is number => value !== null && value !== undefined,
    );

    const locations = new Set(
      publicRooms
        .map((room) => room.locationName)
        .filter((name): name is string => name !== null),
    ).size;

    return {
      totalCapacity,
      availableSpaces,
      preBookingSpaces,
      startingPrice: prices.length ? Math.min(...prices) : null,
      startingCurrency: activePricing[0]?.currency ?? "INR",
      locations,
    };
  },
);

export const getAdminSummary = cache(async (): Promise<AdminSummaryView> => {
  const workspace = await getWorkspaceSummary();
  const totalRooms = mockRooms.length;
  const pricedSpaces = new Set(
    mockRooms.flatMap((room) =>
      room.pricing.filter((record) => record.isActive).map(() => room.id),
    ),
  ).size;
  const activePassPlans = mockPassPlans.filter((plan) => plan.isActive).length;

  return {
    ...workspace,
    totalRooms,
    pricedSpaces,
    activePassPlans,
  };
});
