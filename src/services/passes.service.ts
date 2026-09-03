import "server-only";

import { cache } from "react";

import { prisma } from "@/lib/prisma";
import type { PassPlanView } from "@/types/pass";

export const getPassPlans = cache(
  async (includeInactive = false): Promise<PassPlanView[]> => {
    const plans = await prisma.passPlan.findMany({
      where: includeInactive ? undefined : { isActive: true },
      orderBy: [{ isActive: "desc" }, { name: "asc" }],
    });

    return plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      description: plan.description,
      duration: plan.duration,
      durationUnit: plan.durationUnit,
      price: plan.price?.toNumber() ?? null,
      currency: plan.currency,
      validFrom: plan.validFrom?.toISOString() ?? null,
      validUntil: plan.validUntil?.toISOString() ?? null,
      isActive: plan.isActive,
      notes: plan.notes,
    }));
  },
);
