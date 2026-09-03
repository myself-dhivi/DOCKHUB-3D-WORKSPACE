"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useWorkspaceRotation } from "@/hooks/useWorkspaceRotation";
import { PlanProgress } from "./PlanProgress";
import { WorkspaceEnvironment } from "./WorkspaceEnvironment";
import styles from "./DockhubExperience.module.css";

export function DockhubExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const { activeIndex, activePlan, stage } = useWorkspaceRotation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    const context = gsap.context(() => {
      const targets = {
        brand: root.querySelector<HTMLElement>("[data-intro='brand']"),
        room: root.querySelector<HTMLElement>("[data-intro='room']"),
        architecture: root.querySelector<HTMLElement>("[data-intro='architecture']"),
        phase: root.querySelector<HTMLElement>("[data-intro='phase']"),
        booking: root.querySelector<HTMLElement>("[data-intro='booking']"),
        location: root.querySelector<HTMLElement>("[data-intro='location']"),
        capacity: root.querySelector<HTMLElement>("[data-intro='capacity']"),
        price: root.querySelector<HTMLElement>("[data-intro='price']"),
        availability: root.querySelector<HTMLElement>("[data-intro='availability']"),
        progress: root.querySelector<HTMLElement>("[data-intro='progress']"),
      };
      const mountedTargets = Object.values(targets).filter((target): target is HTMLElement => target !== null);
      gsap.set(mountedTargets, { opacity: 0 });

      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (targets.brand) timeline.fromTo(targets.brand, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.3);
      if (targets.room) timeline.fromTo(targets.room, { scale: 0.985, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.8 }, 0.52);
      if (targets.architecture) timeline.fromTo(targets.architecture, { opacity: 0 }, { opacity: 1, duration: 1.5 }, 0.82);
      if (targets.phase) timeline.fromTo(targets.phase, { x: 16, opacity: 0 }, { x: 0, opacity: 1, duration: 1.1 }, 1.18);
      if (targets.booking) timeline.fromTo(targets.booking, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 1.25 }, 1.55);
      if (targets.location) timeline.fromTo(targets.location, { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 1.15 }, 1.42);
      if (targets.capacity) timeline.fromTo(targets.capacity, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, 1.62);
      if (targets.price) timeline.fromTo(targets.price, { y: 22, rotateY: -3, opacity: 0 }, { y: 0, rotateY: 0, opacity: 1, duration: 1.35 }, 1.9);
      if (targets.availability) timeline.fromTo(targets.availability, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 1.15 }, 2.28);
      if (targets.progress) timeline.fromTo(targets.progress, { opacity: 0 }, { opacity: 1, duration: 0.9 }, 2.55);
    }, root);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <main ref={rootRef} className={styles.experience} aria-label="DockHub workspace installation">
      <WorkspaceEnvironment activeIndex={activeIndex} plan={activePlan} stage={stage} reducedMotion={reducedMotion} />

      <header className={styles.brand} data-intro="brand">
        <Image src="/logo/logo.png" alt="DockHub" width={159} height={98} priority />
      </header>

      <PlanProgress activeIndex={activeIndex} reducedMotion={reducedMotion} />
    </main>
  );
}
