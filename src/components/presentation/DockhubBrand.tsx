import { BRAND_GOLD, withAlpha } from "@/lib/brand";

/** Small text eyebrow (e.g. "DOCKHUB WORKSPACE") for scenes that already show the logo elsewhere. */
export function DockhubBrand({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "clamp(20px, 1.4vw, 28px)",
        fontWeight: 680,
        letterSpacing: ".22em",
        color: withAlpha(BRAND_GOLD, 0.92),
      }}
    >
      {children}
    </div>
  );
}
