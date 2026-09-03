export function formatCurrency(
  amount: number | null | undefined,
  currency = "INR",
): string {
  if (amount == null) return "Contact for pricing";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return "To be confirmed";

  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatLabel(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getBestPrice(
  pricing: Array<{
    regularPrice: number;
    offerPrice: number | null;
    preBookingPrice: number | null;
  }>,
): number | null {
  const values = pricing.flatMap((price) => [
    price.preBookingPrice,
    price.offerPrice,
    price.regularPrice,
  ]);
  const validValues = values.filter((value): value is number => value != null);
  return validValues.length ? Math.min(...validValues) : null;
}
