"use client";

import { AmbientGlow } from "@/components/effects/AmbientGlow";
import { BackgroundMotion } from "@/components/effects/BackgroundMotion";
import { GradientOverlay } from "@/components/effects/GradientOverlay";
import { TRANSITION_DURATION_MS } from "@/data/presentation";
import type { PresentationScene as SceneData, TimelineStep } from "@/types/presentation";

/**
 * `hidden`  — not the foreground scene right now.
 * `entering`— just became foreground; tunnel is still fading out over it.
 * `shown`   — settled, fully visible, holding.
 * `exiting` — about to be swapped out; tunnel is fading in over it.
 */
export type SceneContentState = "hidden" | "entering" | "shown" | "exiting";

interface PresentationSceneProps {
  scene: SceneData;
  index: number;
  isCurrent: boolean;
  step: TimelineStep;
  reducedMotion: boolean;
  /** Lower-third for workspace data, centered for brand/statement scenes. */
  align?: "end" | "center";
  children: (state: SceneContentState) => React.ReactNode;
}

export function PresentationScene({ scene, index, isCurrent, step, reducedMotion, align = "end", children }: PresentationSceneProps) {
  const contentState: SceneContentState = !isCurrent
    ? "hidden"
    : step === "cover"
      ? "exiting"
      : step === "reveal"
        ? "entering"
        : "shown";

  return (
    <div
      aria-hidden={!isCurrent}
      style={{
        position: "absolute",
        inset: 0,
        opacity: isCurrent ? 1 : 0,
        transition: "opacity 350ms ease",
        zIndex: isCurrent ? 1 : 0,
      }}
    >
      <BackgroundMotion
        src={scene.backgroundImage}
        alt={scene.brandLine ? `${scene.brandLine} — ${scene.title.replace("\n", " ")}` : scene.title}
        priority={index === 0}
        active={isCurrent}
        direction={scene.kenBurns}
        activeDurationMs={scene.duration + TRANSITION_DURATION_MS}
        reducedMotion={reducedMotion}
      />
      <AmbientGlow reducedMotion={reducedMotion} />
      <GradientOverlay />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: align === "center" ? "center" : "flex-end",
          alignItems: align === "center" ? "center" : "flex-start",
          textAlign: align === "center" ? "center" : "left",
          padding: "clamp(32px, 5vw, 96px)",
        }}
      >
        {children(contentState)}
      </div>
    </div>
  );
}
