"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import { PLAN_HOLD_MS, WORKSPACE_PLANS } from "@/data/workspace-plans";
import styles from "./DockhubExperience.module.css";

export function PlanProgress({ activeIndex, reducedMotion }: { activeIndex: number; reducedMotion: boolean }) {
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    gsap.set(fill, { scaleX: reducedMotion ? 1 : 0 });
    if (reducedMotion) return;

    const tween = gsap.to(fill, { scaleX: 1, duration: PLAN_HOLD_MS / 1000, ease: "none" });
    const onVisibility = () => (document.hidden ? tween.pause() : tween.resume());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      tween.kill();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [activeIndex, reducedMotion]);

  return (
    <div className={styles.planProgress} data-intro="progress" aria-hidden>
      <span className={styles.progressCount}>0{activeIndex + 1}</span>
      <span className={styles.progressTrack}>
        <span ref={fillRef} className={styles.progressFill} />
      </span>
      <span className={styles.progressTotal}>0{WORKSPACE_PLANS.length}</span>
    </div>
  );
}
