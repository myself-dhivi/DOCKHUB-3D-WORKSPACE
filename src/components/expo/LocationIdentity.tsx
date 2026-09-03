"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import type { PreBookingPlan } from "@/data/workspace-plans";
import styles from "./DockhubExperience.module.css";

export function LocationIdentity({ plan, reducedMotion }: { plan: PreBookingPlan; reducedMotion: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || reducedMotion) return;
    const tween = gsap.fromTo(rootRef.current, { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1, ease: "power3.out" });
    return () => {
      tween.kill();
    };
  }, [plan.id, reducedMotion]);

  return (
    <div ref={rootRef} className={styles.locationIdentity} data-intro="location">
      <span className={styles.locationName}>{plan.name}</span>
      <span className={styles.locationRule} aria-hidden />
      <span className={styles.locationAddress}>{plan.location}</span>
    </div>
  );
}
