/** Dockhub brand marks — the only place these hex values should live. */
export const BRAND_BLUE = "#184091";
export const BRAND_BLUE_DEEP = "#0A2050";
export const BRAND_GOLD = "#F5BD1E";
export const BRAND_GOLD_SOFT = "#FDE7A8";

export function withAlpha(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
