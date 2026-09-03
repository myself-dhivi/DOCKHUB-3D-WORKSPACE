"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import { PRESENTATION_SCENES, TRANSITION_DURATION_MS } from "@/data/presentation";
import { BRAND_GOLD, withAlpha } from "@/lib/brand";

interface LoopSegmentProps {
  isCurrent: boolean;
  isDone: boolean;
  durationMs: number;
  reducedMotion: boolean;
}

function LoopSegment({ isCurrent, isDone, durationMs, reducedMotion }: LoopSegmentProps) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    gsap.killTweensOf(el);

    if (reducedMotion) {
      gsap.set(el, { scaleX: isCurrent || isDone ? 1 : 0 });
      return;
    }

    if (isCurrent) {
      gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: durationMs / 1000, ease: "none" });
    } else {
      gsap.set(el, { scaleX: isDone ? 1 : 0 });
    }
  }, [isCurrent, isDone, durationMs, reducedMotion]);

  return (
    <div style={{ flex: 1, height: 3, borderRadius: 3, background: withAlpha("#FFFFFF", 0.18), overflow: "hidden" }}>
      <div ref={fillRef} style={{ height: "100%", width: "100%", transformOrigin: "left", background: BRAND_GOLD, transform: "scaleX(0)" }} />
    </div>
  );
}

/** Instagram-stories-style loop indicator: one segment per scene, filling in real time. */
export function LoopProgress({ activeIndex, reducedMotion }: { activeIndex: number; reducedMotion: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "clamp(16px, 1.8vw, 24px)",
        left: "clamp(28px, 3vw, 48px)",
        right: "clamp(28px, 3vw, 48px)",
        zIndex: 3,
        display: "flex",
        gap: 8,
      }}
    >
      {PRESENTATION_SCENES.map((scene, i) => (
        <LoopSegment
          key={scene.id}
          isCurrent={i === activeIndex}
          isDone={i < activeIndex}
          durationMs={scene.duration + TRANSITION_DURATION_MS}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
