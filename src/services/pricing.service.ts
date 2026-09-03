import "server-only";

import type { Prisma } from "@prisma/client";
import { cache } from "react";

import { prisma } from "@/lib/prisma";
import type { PricingPlanView, RoomPricingView } from "@/types/pricing";

export const getPricingPlans = cache(async (): Promise<PricingPlanView[]> => {
  const plans = await prisma.pricingPlan.findMany({
    where: { isActive: true },
    orderBy: [{ period: "asc" }, { name: "asc" }],
  });

  return plans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    period: plan.period,
    description: plan.description,
    isActive: plan.isActive,
  }));
});

export const getRoomPricing = cache(
  async (roomId: string): Promise<RoomPricingView[]> => {
    const records = await prisma.roomPricing.findMany({
      where: { roomId, isActive: true },
      include: { room: true, pricingPlan: true },
      orderBy: { createdAt: "asc" },
    });

    return records.map(toPricingView);
  },
);

export const getAllRoomPricing = cache(
  async (includeInactive = false): Promise<RoomPricingView[]> => {
    const records = await prisma.roomPricing.findMany({
      where: includeInactive ? undefined : { isActive: true },
      include: { room: true, pricingPlan: true },
      orderBy: [{ room: { displayOrder: "asc" } }, { createdAt: "asc" }],
    });

    return records.map(toPricingView);
  },
);

type PricingRecord = Prisma.RoomPricingGetPayload<{
  include: { room: true; pricingPlan: true };
}>;

function toPricingView(record: PricingRecord): RoomPricingView {
  return {
    id: record.id,
    roomId: record.roomId,
    roomName: record.room.name,
    roomSlug: record.room.slug,
    planName: record.pricingPlan.name,
    period: record.pricingPlan.period,
    planDescription: record.pricingPlan.description,
    regularPrice: record.regularPrice.toNumber(),
    offerPrice: record.offerPrice?.toNumber() ?? null,
    preBookingPrice: record.preBookingPrice?.toNumber() ?? null,
    currency: record.currency,
    effectiveFrom: record.effectiveFrom?.toISOString() ?? null,
    effectiveUntil: record.effectiveUntil?.toISOString() ?? null,
    isActive: record.isActive,
  };
}
