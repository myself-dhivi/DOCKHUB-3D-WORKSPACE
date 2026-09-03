"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import type { WorkspaceRotationStage } from "@/hooks/useWorkspaceRotation";
import styles from "./DockhubExperience.module.css";

/** Full-frame exposure wash with the plan swap hidden at peak brightness. */
export function PlanTransition({ stage, reducedMotion }: { stage: WorkspaceRotationStage; reducedMotion: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLSpanElement>(null);
  const bloomRef = useRef<HTMLSpanElement>(null);
  const bladeRef = useRef<HTMLSpanElement>(null);
  const flashRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const base = baseRef.current;
    const bloom = bloomRef.current;
    const blade = bladeRef.current;
    const flash = flashRef.current;
    if (!root || !base || !bloom || !blade || !flash) return;

    const elements = [root, base, bloom, blade, flash];
    gsap.killTweensOf(elements);

    if (reducedMotion || stage === "hold") {
      gsap.set(root, { opacity: 0 });
      return;
    }

    if (stage === "cover") {
      gsap.set(root, { opacity: 1 });
      gsap.fromTo(base, { opacity: 0 }, { opacity: 0.76, duration: 0.48, ease: "power2.in" });
      gsap.fromTo(bloom, { opacity: 0, scale: 0.55 }, { opacity: 0.62, scale: 1, duration: 0.48, ease: "power2.in" });
      gsap.fromTo(blade, { xPercent: -165, opacity: 0 }, { xPercent: -12, opacity: 0.9, duration: 0.48, ease: "power2.in" });
      gsap.fromTo(flash, { opacity: 0 }, { opacity: 0.32, duration: 0.48, ease: "power1.in" });
    } else {
      gsap.to(base, { opacity: 0, duration: 0.88, ease: "power3.out" });
      gsap.to(bloom, { opacity: 0, scale: 1.42, duration: 1.02, ease: "power3.out" });
      gsap.to(blade, { xPercent: 175, opacity: 0, duration: 0.94, ease: "power3.out" });
      gsap.to(flash, { opacity: 0, duration: 0.54, ease: "power2.out" });
      gsap.to(root, { opacity: 0, duration: 0.18, delay: 0.88 });
    }

    return () => {
      gsap.killTweensOf(elements);
    };
  }, [reducedMotion, stage]);

  return (
    <div ref={rootRef} className={styles.planTransition} aria-hidden>
      <span ref={baseRef} className={styles.transitionBase} />
      <span ref={bloomRef} className={styles.transitionBloom} />
      <span ref={bladeRef} className={styles.transitionBlade} />
      <span ref={flashRef} className={styles.transitionFlash} />
    </div>
  );
}
