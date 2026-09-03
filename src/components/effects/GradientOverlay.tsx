import { BRAND_GOLD, withAlpha } from "@/lib/brand";

/**
 * Layer 3 (readability) + layer 4 (architectural light treatment) for a
 * presentation scene: a bottom-weighted gradient — tinted brand navy rather
 * than plain black, so every scene reads as one graded, branded look — so
 * large type stays legible over any room photo, plus a hairline top edge
 * that reads as an architectural gold light strip rather than decoration.
 */
export function GradientOverlay() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg, rgba(4,9,26,.94) 0%, rgba(5,11,30,.68) 32%, rgba(6,13,32,.22) 58%, rgba(6,13,32,.06) 75%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(120% 90% at 50% 100%, transparent 45%, rgba(3,7,20,.6) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(4,9,26,.5) 0%, transparent 22%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${withAlpha(BRAND_GOLD, 0.5)}, transparent)`,
        }}
      />
    </div>
  );
}
