import { BRAND_GOLD, withAlpha } from "@/lib/brand";
import { GlassPanel } from "./GlassPanel";

export function AvailabilityDisplay({ label, value }: { label: string; value: string }) {
  return (
    <GlassPanel style={{ borderRadius: 999, padding: "14px 28px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: "clamp(12px, .85vw, 15px)", letterSpacing: ".18em", color: withAlpha(BRAND_GOLD, 0.9), fontWeight: 650 }}>
          {label}
        </span>
        <span style={{ fontSize: "clamp(18px, 1.5vw, 24px)", fontWeight: 680, color: "#fff", letterSpacing: ".03em" }}>{value}</span>
      </div>
    </GlassPanel>
  );
}
