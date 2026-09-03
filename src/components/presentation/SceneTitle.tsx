import { BRAND_BLUE_DEEP, withAlpha } from "@/lib/brand";

/**
 * The one element every scene gets a real "3D" moment on: it flips up into
 * place (see useSceneEntrance) rather than just fading, and carries a layered
 * depth shadow so it reads as extruded rather than flat text on a photo.
 */
export function SceneTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-anim="title"
      style={{
        fontSize: "clamp(56px, 7.5vw, 84px)",
        fontWeight: 800,
        color: "#fff",
        lineHeight: 0.96,
        letterSpacing: "-.01em",
        whiteSpace: "pre-line",
        textShadow: [
          `2px 2px 0 ${withAlpha(BRAND_BLUE_DEEP, 0.55)}`,
          `4px 4px 0 ${withAlpha(BRAND_BLUE_DEEP, 0.4)}`,
          `8px 10px 24px ${withAlpha("#000000", 0.55)}`,
        ].join(", "),
      }}
    >
      {children}
    </div>
  );
}
