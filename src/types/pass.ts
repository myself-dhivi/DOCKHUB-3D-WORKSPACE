export type DurationUnit = "DAYS" | "MONTHS" | "YEARS";

export interface PassPlanView {
  id: string;
  name: string;
  description: string | null;
  duration: number | null;
  durationUnit: DurationUnit | null;
  price: number | null;
  currency: string;
  validFrom: string | null;
  validUntil: string | null;
  isActive: boolean;
  notes: string | null;
}
