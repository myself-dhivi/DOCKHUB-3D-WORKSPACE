interface WorkspacePlanBase {
  id: "pars" | "vidhai" | "mars";
  sequence: "01" | "02" | "03";
  name: "PARS" | "VIDHAI" | "MARS";
  location: string;
  mode: "BOOKING" | "PRE-BOOKING";
  availabilityLabel: string;
  availabilityDate: string;
  image: string;
  imagePosition: string;
}

export interface BookingPlan extends WorkspacePlanBase {
  mode: "BOOKING";
}

export interface PreBookingPlan extends WorkspacePlanBase {
  mode: "PRE-BOOKING";
  capacity: number;
  regularPrice: number;
  preBookingPrice: number;
}

export type WorkspacePlan = BookingPlan | PreBookingPlan;

/**
 * The sole source of truth for the installation's commercial content.
 * The composition only knows how to present a plan; it never owns plan values.
 */
export const WORKSPACE_PLANS = [
  {
    id: "pars",
    sequence: "01",
    name: "PARS",
    location: "TATABAD",
    mode: "BOOKING",
    availabilityLabel: "BOOKING STATUS",
    availabilityDate: "READY NOW",
    image: "/images/rooms/reception-placeholder.jpg",
    imagePosition: "50% 50%",
  },
  {
    id: "vidhai",
    sequence: "02",
    name: "VIDHAI",
    location: "VILANKURICHI — CHERAN MA NAGAR",
    mode: "PRE-BOOKING",
    capacity: 150,
    regularPrice: 9500,
    preBookingPrice: 7999,
    availabilityLabel: "OPENING / APPLICABLE",
    availabilityDate: "30 OCT",
    image: "/images/rooms/workspace-phase-1-placeholder.jpg",
    imagePosition: "48% 50%",
  },
  {
    id: "mars",
    sequence: "03",
    name: "MARS",
    location: "RS PURAM",
    mode: "PRE-BOOKING",
    capacity: 350,
    regularPrice: 8000,
    preBookingPrice: 6499,
    availabilityLabel: "OPENING / APPLICABLE",
    availabilityDate: "01 JAN 2027",
    image: "/images/rooms/workspace-phase-2-placeholder.jpg",
    imagePosition: "50% 50%",
  },
] as const satisfies readonly WorkspacePlan[];

export const PLAN_HOLD_MS = 9000;
export const PLAN_MORPH_MS = 1100;
export const PLAN_COVER_MS = 480;
export const PLAN_REVEAL_MS = 1050;
export const PLAN_CYCLE_MS = PLAN_HOLD_MS * WORKSPACE_PLANS.length;
