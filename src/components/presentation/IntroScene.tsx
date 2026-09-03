"use client";

import { useSceneEntrance } from "@/hooks/useSceneEntrance";
import type { PresentationScene as SceneData } from "@/types/presentation";
import { BrandMark } from "./BrandMark";
import type { SceneContentState } from "./PresentationScene";
import { SceneTitle } from "./SceneTitle";

const DELAYS = { brand: 0, title: 0.4, subtitle: 0.95 };

export function IntroScene({ scene, state, reducedMotion }: { scene: SceneData; state: SceneContentState; reducedMotion: boolean }) {
  const rootRef = useSceneEntrance(state, reducedMotion, DELAYS);

  return (
    <div ref={rootRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(20px, 2.4vw, 32px)", maxWidth: 1100 }}>
      <div data-anim="brand">
        <BrandMark variant="hero" idle="tilt3d" reducedMotion={reducedMotion} />
      </div>
      <SceneTitle>{scene.title}</SceneTitle>
      {scene.subtitle && (
        <div data-anim="subtitle" style={{ fontSize: "clamp(20px, 1.6vw, 28px)", color: "rgba(255,255,255,.82)", maxWidth: 780, lineHeight: 1.5 }}>
          {scene.subtitle}
        </div>
      )}
    </div>
  );
}
