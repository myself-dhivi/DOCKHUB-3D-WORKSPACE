export type PricingPeriod =
  | "HOURLY"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "YEARLY"
  | "CUSTOM";

export interface RoomPricingView {
  id: string;
  roomId: string;
  roomName: string;
  roomSlug: string;
  planName: string;
  period: PricingPeriod;
  planDescription: string | null;
  regularPrice: number;
  offerPrice: number | null;
  preBookingPrice: number | null;
  currency: string;
  effectiveFrom: string | null;
  effectiveUntil: string | null;
  isActive: boolean;
}

export interface PricingPlanView {
  id: string;
  name: string;
  period: PricingPeriod;
  description: string | null;
  isActive: boolean;
}
