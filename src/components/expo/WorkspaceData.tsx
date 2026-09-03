"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import type { WorkspacePlan } from "@/data/workspace-plans";
import { AvailabilityHero } from "./AvailabilityHero";
import { BookingHero } from "./BookingHero";
import { CapacityHero } from "./CapacityHero";
import { LocationIdentity } from "./LocationIdentity";
import { PhaseMarker } from "./PhaseMarker";
import { PriceHero } from "./PriceHero";
import styles from "./DockhubExperience.module.css";

export function WorkspaceData({ plan, reducedMotion }: { plan: WorkspacePlan; reducedMotion: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content || reducedMotion) return;

    const tween = gsap.fromTo(
      content,
      { opacity: 0.16, scale: 0.965, y: 16, filter: "blur(7px)" },
      { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.25, delay: 0.08, ease: "power3.out" },
    );
    return () => {
      tween.kill();
    };
  }, [plan.id, reducedMotion]);

  return (
    <section className={styles.workspaceData} aria-live="polite" aria-atomic="true">
      <div ref={contentRef} className={styles.planContent}>
        <PhaseMarker plan={plan} reducedMotion={reducedMotion} />
        {plan.mode === "BOOKING" ? (
          <BookingHero plan={plan} reducedMotion={reducedMotion} />
        ) : (
          <>
            <LocationIdentity plan={plan} reducedMotion={reducedMotion} />
            <CapacityHero plan={plan} reducedMotion={reducedMotion} />
            <PriceHero plan={plan} reducedMotion={reducedMotion} />
            <AvailabilityHero plan={plan} reducedMotion={reducedMotion} />
          </>
        )}
      </div>
    </section>
  );
}
