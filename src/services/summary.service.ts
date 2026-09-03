import "server-only";

import { RoomStatus } from "@prisma/client";
import { cache } from "react";

import { prisma } from "@/lib/prisma";
import type { AdminSummaryView, WorkspaceSummaryView } from "@/types/room";

export const getWorkspaceSummary = cache(
  async (): Promise<WorkspaceSummaryView> => {
    const publicStatus = { not: RoomStatus.INACTIVE } as const;
    const bookableStatuses: RoomStatus[] = [
      RoomStatus.AVAILABLE,
      RoomStatus.PRE_BOOKING,
    ];
    const [capacity, availableSpaces, preBookingSpaces, priceRows, locations] =
      await Promise.all([
        prisma.room.aggregate({
          where: { status: { in: bookableStatuses } },
          _sum: { capacity: true },
        }),
        prisma.room.count({ where: { status: RoomStatus.AVAILABLE } }),
        prisma.room.count({ where: { status: RoomStatus.PRE_BOOKING } }),
        prisma.roomPricing.findMany({
          where: { isActive: true },
          select: {
            regularPrice: true,
            offerPrice: true,
            preBookingPrice: true,
            currency: true,
          },
        }),
        prisma.room.groupBy({
          by: ["locationId"],
          where: { locationId: { not: null }, status: publicStatus },
        }),
      ]);

    const monetaryValues = priceRows.flatMap((row) => [
      row.preBookingPrice?.toNumber(),
      row.offerPrice?.toNumber(),
      row.regularPrice.toNumber(),
    ]);
    const prices = monetaryValues.filter(
      (value): value is number => value !== undefined,
    );

    return {
      totalCapacity: capacity._sum?.capacity ?? 0,
      availableSpaces,
      preBookingSpaces,
      startingPrice: prices.length ? Math.min(...prices) : null,
      startingCurrency: priceRows[0]?.currency ?? "INR",
      locations: locations.length,
    };
  },
);

export const getAdminSummary = cache(async (): Promise<AdminSummaryView> => {
  const [workspace, totalRooms, pricedSpaces, activePassPlans] =
    await Promise.all([
      getWorkspaceSummary(),
      prisma.room.count(),
      prisma.roomPricing.groupBy({
        by: ["roomId"],
        where: { isActive: true },
      }),
      prisma.passPlan.count({ where: { isActive: true } }),
    ]);

  return {
    ...workspace,
    totalRooms,
    pricedSpaces: pricedSpaces.length,
    activePassPlans,
  };
});
