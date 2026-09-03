"use client";

import { useEffect, useState } from "react";

import { PRESENTATION_SCENES, TRANSITION_DURATION_MS } from "@/data/presentation";
import type { PresentationTimelineState, TimelineStep } from "@/types/presentation";

const SCENE_COUNT = PRESENTATION_SCENES.length;
const COVER_MS = TRANSITION_DURATION_MS / 2;
const REVEAL_MS = TRANSITION_DURATION_MS / 2;

function stepDuration(step: TimelineStep, activeIndex: number): number {
  if (step === "scene") return PRESENTATION_SCENES[activeIndex].duration;
  return step === "cover" ? COVER_MS : REVEAL_MS;
}

function nextState(step: TimelineStep, activeIndex: number): { step: TimelineStep; activeIndex: number } {
  if (step === "scene") return { step: "cover", activeIndex };
  if (step === "cover") return { step: "reveal", activeIndex: (activeIndex + 1) % SCENE_COUNT };
  return { step: "scene", activeIndex };
}

/**
 * Drives the expo-stall loop with a single live timer at a time (pause/resume-safe,
 * no accumulating intervals). The background/content only ever swap on the
 * cover → reveal edge, i.e. while the LightTunnel transition is at its most opaque.
 *
 *   scene (hold) → cover (tunnel ramps in, old scene still showing)
 *                → [index advances here] →
 *                  reveal (tunnel ramps out, new scene already in place) → scene …
 */
export function usePresentationTimeline(): PresentationTimelineState {
  const [activeIndex, setActiveIndex] = useState(0);
  const [step, setStep] = useState<TimelineStep>("scene");

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let deadline = 0;

    const run = (durationMs: number) => {
      deadline = performance.now() + durationMs;
      timeoutId = setTimeout(() => {
        timeoutId = null;
        const next = nextState(step, activeIndex);
        setStep(next.step);
        setActiveIndex(next.activeIndex);
      }, durationMs);
    };

    run(stepDuration(step, activeIndex));

    const onVisibility = () => {
      if (document.hidden) {
        if (timeoutId != null) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      } else if (timeoutId == null) {
        run(Math.max(0, deadline - performance.now()));
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (timeoutId != null) clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [step, activeIndex]);

  return { activeIndex, step };
}
