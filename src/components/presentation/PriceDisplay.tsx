"use client";

import { useEffect, useRef } from "react";

import { animateCountUp } from "@/lib/animateCountUp";
import { BRAND_GOLD, withAlpha } from "@/lib/brand";
import { formatCurrency } from "@/lib/formatters";

interface PriceDisplayProps {
  label: string;
  amount: number;
  currency?: "INR";
  suffix?: string;
  /** "hero" = the pre-booking/offer price (the number the whole scene is built around). */
  emphasis?: "hero" | "secondary";
  animate: boolean;
  reducedMotion: boolean;
}

export function PriceDisplay({ label, amount, currency = "INR", suffix, emphasis = "secondary", animate, reducedMotion }: PriceDisplayProps) {
  const isHero = emphasis === "hero";
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    if (!animate || reducedMotion) {
      el.textContent = formatCurrency(amount, currency);
      return;
    }
    const tween = animateCountUp(el, amount, { format: (n) => formatCurrency(n, currency) });
    return () => {
      tween.kill();
    };
  }, [animate, amount, currency, reducedMotion]);

  return (
    <div style={isHero ? { filter: `drop-shadow(0 0 34px ${withAlpha(BRAND_GOLD, 0.4)})` } : undefined}>
      <div
        style={{
          fontSize: "clamp(16px, 1.1vw, 20px)",
          fontWeight: 650,
          letterSpacing: ".16em",
          color: isHero ? BRAND_GOLD : "rgba(255,255,255,.6)",
        }}
      >
        {label}
      </div>
      <div
        ref={numRef}
        style={{
          fontSize: isHero ? "clamp(64px, 7.5vw, 96px)" : "clamp(32px, 2.6vw, 44px)",
          fontWeight: 780,
          lineHeight: 1,
          marginTop: isHero ? 6 : 4,
          ...(isHero
            ? {
                backgroundImage: `linear-gradient(180deg, #FFFFFF 0%, ${BRAND_GOLD} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }
            : { color: "rgba(255,255,255,.7)" }),
        }}
      >
        {formatCurrency(0, currency)}
      </div>
      {suffix && (
        <div style={{ fontSize: "clamp(14px, 1vw, 18px)", letterSpacing: ".14em", color: "rgba(255,255,255,.55)", marginTop: 6 }}>
          {suffix}
        </div>
      )}
    </div>
  );
}
