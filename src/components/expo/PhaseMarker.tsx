"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import type { WorkspacePlan } from "@/data/workspace-plans";
import styles from "./DockhubExperience.module.css";

export function PhaseMarker({ plan, reducedMotion }: { plan: WorkspacePlan; reducedMotion: boolean }) {
  const valueRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!valueRef.current || reducedMotion) return;
    const tween = gsap.fromTo(valueRef.current, { x: 14, opacity: 0 }, { x: 0, opacity: 1, duration: 1.05, ease: "power3.out" });
    return () => {
      tween.kill();
    };
  }, [plan.id, reducedMotion]);

  return (
    <div className={styles.phaseMarker} data-intro="phase">
      <span className={styles.phaseIndex}>{plan.sequence}</span>
      <span className={styles.phaseRule} aria-hidden />
      <span ref={valueRef} className={styles.phaseName}>
        {plan.mode}
      </span>
      <span className={styles.phaseMeta}>{plan.name}</span>
    </div>
  );
}
