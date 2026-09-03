"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import { BRAND_BLUE, BRAND_GOLD, withAlpha } from "@/lib/brand";

interface Orb {
  color: string;
  size: number;
  top: string;
  left: string;
  driftX: number;
  driftY: number;
  duration: number;
}

const ORBS: Orb[] = [
  { color: withAlpha(BRAND_GOLD, 0.32), size: 560, top: "8%", left: "72%", driftX: -60, driftY: 40, duration: 13 },
  { color: withAlpha(BRAND_BLUE, 0.4), size: 620, top: "62%", left: "6%", driftX: 50, driftY: -35, duration: 16 },
  { color: withAlpha(BRAND_GOLD, 0.2), size: 420, top: "78%", left: "68%", driftX: -35, driftY: -30, duration: 11 },
];

/**
 * Slow-drifting blurred brand-color orbs, blended over the room photo. Always
 * running (independent of scene changes) — the bit of continuous ambient
 * motion that keeps the frame feeling alive between the big Ken Burns/tunnel
 * beats, the way a premium motion-graphics loop never actually sits still.
 */
export function AmbientGlow({ reducedMotion }: { reducedMotion: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;
    const nodes = gsap.utils.toArray<HTMLElement>("[data-orb]", root);
    const tweens = nodes.map((node, i) =>
      gsap.to(node, {
        x: ORBS[i].driftX,
        y: ORBS[i].driftY,
        duration: ORBS[i].duration,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }),
    );
    return () => tweens.forEach((t) => t.kill());
  }, [reducedMotion]);

  return (
    <div ref={rootRef} style={{ position: "absolute", inset: 0, overflow: "hidden", mixBlendMode: "screen", pointerEvents: "none" }}>
      {ORBS.map((orb, i) => (
        <div
          key={i}
          data-orb
          style={{
            position: "absolute",
            top: orb.top,
            left: orb.left,
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: "blur(10px)",
          }}
        />
      ))}
    </div>
  );
}
