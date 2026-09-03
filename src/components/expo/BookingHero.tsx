"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import type { BookingPlan } from "@/data/workspace-plans";
import styles from "./DockhubExperience.module.css";

export function BookingHero({ plan, reducedMotion }: { plan: BookingPlan; reducedMotion: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || reducedMotion) return;
    const context = gsap.context(() => {
      gsap.fromTo("[data-booking-line]", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 1.15, stagger: 0.12, ease: "power3.out" });
    }, rootRef);
    return () => context.revert();
  }, [plan.id, reducedMotion]);

  return (
    <div ref={rootRef} className={styles.bookingHero} data-intro="booking">
      <span data-booking-line className={styles.bookingEyebrow}>BOOKING PLANS</span>
      <span data-booking-line className={styles.bookingLabel}>READY FOR BOOKING</span>
      <span data-booking-line className={styles.bookingName}>{plan.name}</span>
      <span data-booking-line className={styles.bookingLocation}>
        <i aria-hidden /> {plan.location}
      </span>
      <span data-booking-line className={styles.bookingOpen}>
        <i aria-hidden /> BOOKING OPEN
      </span>
    </div>
  );
}
