"use client";

import { useSceneEntrance } from "@/hooks/useSceneEntrance";
import type { PresentationScene as SceneData } from "@/types/presentation";
import { AvailabilityDisplay } from "./AvailabilityDisplay";
import { CapacityDisplay } from "./CapacityDisplay";
import { DockhubBrand } from "./DockhubBrand";
import { GlassPanel } from "./GlassPanel";
import type { SceneContentState } from "./PresentationScene";
import { PriceDisplay } from "./PriceDisplay";
import { SceneTitle } from "./SceneTitle";

// Cascade from the brief: eyebrow → heading (3D flip, see useSceneEntrance) → capacity → regular price → pre-booking → date.
const DELAYS = { brand: 0, title: 0.25, capacity: 0.8, regular: 1.1, prebooking: 1.4, availability: 1.7 };

export function WorkspaceScene({ scene, state, reducedMotion }: { scene: SceneData; state: SceneContentState; reducedMotion: boolean }) {
  const rootRef = useSceneEntrance(state, reducedMotion, DELAYS);
  const animate = state === "entering";

  return (
    <div ref={rootRef} style={{ display: "flex", flexDirection: "column", gap: "clamp(18px, 2vw, 30px)", maxWidth: 1440 }}>
      <div data-anim="brand">
        <DockhubBrand>{scene.brandLine}</DockhubBrand>
      </div>
      <SceneTitle>{scene.title}</SceneTitle>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: "clamp(18px, 2vw, 28px)" }}>
        {scene.capacity != null && (
          <div data-anim="capacity">
            <GlassPanel>
              <CapacityDisplay value={scene.capacity} animate={animate} reducedMotion={reducedMotion} />
            </GlassPanel>
          </div>
        )}
        {scene.regularPrice != null && (
          <div data-anim="regular">
            <GlassPanel>
              <PriceDisplay
                label="REGULAR PRICE"
                amount={scene.regularPrice}
                currency={scene.currency}
                suffix={scene.priceSuffix}
                emphasis="secondary"
                animate={animate}
                reducedMotion={reducedMotion}
              />
            </GlassPanel>
          </div>
        )}
        {scene.preBookingPrice != null && (
          <div data-anim="prebooking">
            <GlassPanel accent="hero">
              <PriceDisplay
                label="PRE-BOOKING"
                amount={scene.preBookingPrice}
                currency={scene.currency}
                suffix={scene.priceSuffix}
                emphasis="hero"
                animate={animate}
                reducedMotion={reducedMotion}
              />
            </GlassPanel>
          </div>
        )}
        {scene.availabilityValue && (
          <div data-anim="availability" style={{ display: "flex", alignItems: "center" }}>
            <AvailabilityDisplay label={scene.availabilityLabel ?? "AVAILABILITY"} value={scene.availabilityValue} />
          </div>
        )}
      </div>
    </div>
  );
}
