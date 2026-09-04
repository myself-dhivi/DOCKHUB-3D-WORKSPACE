import "server-only";

import { cache } from "react";

import { mockPassPlans } from "@/data/mock-workspace";
import type { PassPlanView } from "@/types/pass";

export const getPassPlans = cache(
  async (includeInactive = false): Promise<PassPlanView[]> => {
    return mockPassPlans
      .filter((plan) => includeInactive || plan.isActive)
      .sort((a, b) => {
        if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
  },
);
