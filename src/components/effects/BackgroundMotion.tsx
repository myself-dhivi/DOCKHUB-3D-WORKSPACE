"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

import type { KenBurnsDirection } from "@/types/presentation";

interface BackgroundMotionProps {
  src: string;
  alt: string;
  priority?: boolean;
  /** True for exactly as long as this scene is the one in the foreground. */
  active: boolean;
  direction: KenBurnsDirection;
  /** Ken Burns runs continuously for this long once `active` goes true (scene hold + one transition). */
  activeDurationMs: number;
  reducedMotion: boolean;
}

/** Layer 1 (static room photo) + layer 2 (restrained Ken Burns drift). */
export function BackgroundMotion({ src, alt, priority, active, direction, activeDurationMs, reducedMotion }: BackgroundMotionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    tweenRef.current?.kill();

    if (!active || reducedMotion) {
      gsap.set(el, { scale: 1, xPercent: 0, yPercent: 0 });
      return;
    }

    gsap.set(el, { scale: 1, xPercent: 0, yPercent: 0 });
    tweenRef.current = gsap.to(el, {
      scale: 1.06,
      xPercent: direction.x,
      yPercent: direction.y,
      duration: activeDurationMs / 1000,
      ease: "none",
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [active, reducedMotion, direction.x, direction.y, activeDurationMs]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div ref={ref} style={{ position: "absolute", inset: "-4%", willChange: "transform" }}>
        <Image src={src} alt={alt} fill priority={priority} sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
}
