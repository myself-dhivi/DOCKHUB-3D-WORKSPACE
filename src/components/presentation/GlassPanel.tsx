import { withAlpha } from "@/lib/brand";

interface GlassPanelProps {
  children: React.ReactNode;
  /** "hero" gets the gold rim + stronger lift, for the number the scene is built around. */
  accent?: "hero" | "default";
  style?: React.CSSProperties;
}

/**
 * A frosted glass card that reads as a floating physical object in front of
 * the room photo — the "3D showcase" surface every number sits on, instead of
 * text simply overlaid on the image.
 */
export function GlassPanel({ children, accent = "default", style }: GlassPanelProps) {
  const isHero = accent === "hero";

  return (
    <div
      style={{
        position: "relative",
        padding: isHero ? "clamp(20px, 2vw, 32px) clamp(28px, 2.6vw, 40px)" : "clamp(16px, 1.6vw, 24px) clamp(20px, 2vw, 28px)",
        borderRadius: 20,
        background: isHero
          ? `linear-gradient(155deg, ${withAlpha("#FFFFFF", 0.14)} 0%, ${withAlpha("#FFFFFF", 0.05)} 100%)`
          : `linear-gradient(155deg, ${withAlpha("#FFFFFF", 0.08)} 0%, ${withAlpha("#FFFFFF", 0.03)} 100%)`,
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        border: `1px solid ${isHero ? withAlpha("#F5BD1E", 0.45) : withAlpha("#FFFFFF", 0.14)}`,
        boxShadow: isHero
          ? `0 24px 60px ${withAlpha("#0A2050", 0.45)}, 0 0 0 1px ${withAlpha("#F5BD1E", 0.08)} inset, 0 1px 0 ${withAlpha("#FFFFFF", 0.25)} inset`
          : `0 18px 44px ${withAlpha("#0A2050", 0.35)}, 0 1px 0 ${withAlpha("#FFFFFF", 0.16)} inset`,
        transformStyle: "preserve-3d",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
