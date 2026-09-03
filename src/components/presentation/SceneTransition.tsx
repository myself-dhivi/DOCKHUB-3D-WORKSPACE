"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import LightTunnel from "@/components/effects/LightTunnel";
import { TRANSITION_DURATION_MS } from "@/data/presentation";
import type { TimelineStep } from "@/types/presentation";

const HALF_TRANSITION_S = TRANSITION_DURATION_MS / 2 / 1000;

/**
 * One LightTunnel instance, reused for every cut in the loop (never unmounted),
 * shown only as the cinematic bridge between scenes — not as a permanent backdrop.
 * Ramps in during "cover" (old scene still in place underneath), stays near-opaque
 * for the instant the scene index swaps, then ramps out during "reveal".
 */
export function SceneTransition({ step, reducedMotion }: { step: TimelineStep; reducedMotion: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || reducedMotion) return;

    gsap.killTweensOf(el);
    if (step === "cover") {
      gsap.to(el, { opacity: 1, duration: HALF_TRANSITION_S, ease: "power2.in" });
    } else if (step === "reveal") {
      gsap.to(el, { opacity: 0, duration: HALF_TRANSITION_S, ease: "power2.out" });
    } else {
      gsap.set(el, { opacity: 0 });
    }
  }, [step, reducedMotion]);

  // Unattended TV signage: no tunnel motion at all under prefers-reduced-motion.
  // PresentationScene's plain opacity crossfade still carries the cut.
  if (reducedMotion) return null;

  return (
    <div ref={wrapRef} aria-hidden style={{ position: "absolute", inset: 0, zIndex: 5, opacity: 0, pointerEvents: "none" }}>
      <LightTunnel
        cableColor="#F5BD1E"
        pulseColor="#FFFFFF"
        tunnelColor="#184091"
        tunnelOpacity={0}
        speed={0.25}
        flowDirection="outward"
        pulseSpeed={2}
        pulseLength={0.28}
        pulseBlend={1}
        pulseWidth={1}
        cableCount={20}
        thickness={0.35}
        rimWidth={0.15}
        waviness={0.18}
        sway={0.25}
        size={1}
        centerX={0}
        centerY={0}
        glow={1}
        fadeNear={0.5}
        fadeFar={2}
        brightness={1}
        colorVariance
        grain
        grainIntensity={0.025}
        opacity={1}
        mouseInteraction={false}
      />
    </div>
  );
}
