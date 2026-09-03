"use client";

import { useEffect, useState } from "react";

import { PLAN_COVER_MS, PLAN_HOLD_MS, PLAN_REVEAL_MS, WORKSPACE_PLANS } from "@/data/workspace-plans";

export type WorkspaceRotationStage = "hold" | "cover" | "reveal";

function getStageDuration(stage: WorkspaceRotationStage) {
  if (stage === "cover") return PLAN_COVER_MS;
  if (stage === "reveal") return PLAN_REVEAL_MS;
  return PLAN_HOLD_MS;
}

/**
 * Advances one persistent environment through its plans. A deadline is retained
 * while the document is hidden, so timers never accumulate during long expo runs.
 */
export function useWorkspaceRotation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stage, setStage] = useState<WorkspaceRotationStage>("hold");

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let remaining = getStageDuration(stage);
    let startedAt = performance.now();

    const schedule = (delay: number) => {
      remaining = delay;
      startedAt = performance.now();
      timeoutId = setTimeout(() => {
        timeoutId = null;
        if (stage === "hold") {
          setStage("cover");
        } else if (stage === "cover") {
          setActiveIndex((current) => (current + 1) % WORKSPACE_PLANS.length);
          setStage("reveal");
        } else {
          setStage("hold");
        }
      }, delay);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (timeoutId !== null) {
          clearTimeout(timeoutId);
          timeoutId = null;
          remaining = Math.max(0, remaining - (performance.now() - startedAt));
        }
        return;
      }

      if (timeoutId === null) schedule(remaining);
    };

    schedule(getStageDuration(stage));
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      if (timeoutId !== null) clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [activeIndex, stage]);

  return {
    activeIndex,
    activePlan: WORKSPACE_PLANS[activeIndex],
    stage,
  };
}
