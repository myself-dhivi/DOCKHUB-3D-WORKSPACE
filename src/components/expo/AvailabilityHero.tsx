"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import type { WorkspacePlan } from "@/data/workspace-plans";
import styles from "./DockhubExperience.module.css";

export function AvailabilityHero({ plan, reducedMotion }: { plan: WorkspacePlan; reducedMotion: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo("[data-morph]", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 1.05, stagger: 0.1, ease: "power3.out" });
    }, rootRef);
    return () => context.revert();
  }, [plan.id, reducedMotion]);

  return (
    <div ref={rootRef} className={styles.availabilityHero} data-intro="availability">
      <div>
        <span data-morph className={styles.availabilityLabel}>
          {plan.availabilityLabel}
        </span>
        <span data-morph className={styles.availabilityDate}>
          {plan.availabilityDate}
        </span>
      </div>
    </div>
  );
}
