"use client";

import { useEffect, useRef } from "react";

import { animateCountUp } from "@/lib/animateCountUp";

interface CapacityDisplayProps {
  value: number;
  /** Plays the count-up the instant this flips true (fresh, every loop pass). */
  animate: boolean;
  reducedMotion: boolean;
}

export function CapacityDisplay({ value, animate, reducedMotion }: CapacityDisplayProps) {
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    if (!animate || reducedMotion) {
      el.textContent = value.toLocaleString("en-IN");
      return;
    }
    const tween = animateCountUp(el, value, { format: (n) => n.toLocaleString("en-IN") });
    return () => {
      tween.kill();
    };
  }, [animate, value, reducedMotion]);

  return (
    <div>
      <div ref={numRef} style={{ fontSize: "clamp(34px, 3.8vw, 52px)", fontWeight: 780, color: "#fff", lineHeight: 1 }}>
        0
      </div>
      <div style={{ fontSize: "clamp(14px, 1vw, 18px)", letterSpacing: ".2em", color: "rgba(255,255,255,.62)", marginTop: 6, fontWeight: 600 }}>
        SEATS
      </div>
    </div>
  );
}
