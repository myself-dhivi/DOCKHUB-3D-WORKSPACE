"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface BrandMarkProps {
  variant?: "hero" | "corner";
  /** Gentle continuous 3D tilt — a display-case float, never a full spin (the wordmark must stay readable). */
  idle?: "tilt3d" | "none";
  reducedMotion?: boolean;
}

const SIZES: Record<NonNullable<BrandMarkProps["variant"]>, { width: number; height: number }> = {
  hero: { width: 340, height: 209 },
  corner: { width: 128, height: 79 },
};

export function BrandMark({ variant = "hero", idle = "none", reducedMotion = false }: BrandMarkProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || idle !== "tilt3d" || reducedMotion) return;

    gsap.set(el, { rotateY: 0, rotateX: 0, y: 0 });
    const tween = gsap.to(el, {
      rotateY: 14,
      rotateX: -6,
      y: -10,
      duration: 3.6,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, [idle, reducedMotion]);

  const size = SIZES[variant];

  return (
    <div style={{ perspective: 900 }}>
      <div ref={wrapRef} style={{ width: size.width, height: size.height, transformStyle: "preserve-3d" }}>
        <Image
          src="/logo/logo.png"
          alt="Dockhub"
          width={size.width}
          height={size.height}
          priority={variant === "hero"}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
