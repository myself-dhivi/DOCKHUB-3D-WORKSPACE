"use client";

import { PRESENTATION_SCENES } from "@/data/presentation";
import { usePresentationTimeline } from "@/hooks/usePresentationTimeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BrandMark } from "./BrandMark";
import { ClosingScene } from "./ClosingScene";
import { IntroScene } from "./IntroScene";
import { LoopProgress } from "./LoopProgress";
import { PresentationScene } from "./PresentationScene";
import { SceneTransition } from "./SceneTransition";
import { WorkspaceScene } from "./WorkspaceScene";

/**
 * The entire product: an unattended, looping expo-stall presentation.
 * No navigation, no buttons, no scroll — this is the only thing `/` renders.
 */
export function DockhubPresentation() {
  const { activeIndex, step } = usePresentationTimeline();
  const reducedMotion = useReducedMotion();

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#05070f", cursor: "none" }}>
      {PRESENTATION_SCENES.map((scene, index) => (
        <PresentationScene
          key={scene.id}
          scene={scene}
          index={index}
          isCurrent={index === activeIndex}
          step={step}
          reducedMotion={reducedMotion}
          align={scene.type === "workspace" ? "end" : "center"}
        >
          {(state) => {
            if (scene.type === "intro") return <IntroScene scene={scene} state={state} reducedMotion={reducedMotion} />;
            if (scene.type === "closing") return <ClosingScene scene={scene} state={state} reducedMotion={reducedMotion} />;
            return <WorkspaceScene scene={scene} state={state} reducedMotion={reducedMotion} />;
          }}
        </PresentationScene>
      ))}

      <LoopProgress activeIndex={activeIndex} reducedMotion={reducedMotion} />

      <div style={{ position: "absolute", top: "clamp(28px, 3.2vw, 44px)", left: "clamp(28px, 3vw, 48px)", zIndex: 3, opacity: 0.92 }}>
        <BrandMark variant="corner" />
      </div>

      <SceneTransition step={step} reducedMotion={reducedMotion} />
    </div>
  );
}
