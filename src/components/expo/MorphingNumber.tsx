"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import { PLAN_MORPH_MS } from "@/data/workspace-plans";

interface MorphingNumberProps {
  value: number;
  format?: (value: number) => string;
  reducedMotion: boolean;
  className?: string;
}

const formatDefault = (value: number) => value.toLocaleString("en-IN");

/** A restrained numerical morph: one short lift, with no rolling/slot effect. */
export function MorphingNumber({ value, format = formatDefault, reducedMotion, className }: MorphingNumberProps) {
  const valueRef = useRef(value);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const previous = valueRef.current;
    valueRef.current = value;
    element.textContent = format(reducedMotion ? value : previous);

    if (reducedMotion || previous === value) {
      element.textContent = format(value);
      return;
    }

    const counter = { current: previous };
    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { yPercent: 20, opacity: 0.18, filter: "blur(5px)" },
        { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: PLAN_MORPH_MS / 1000, ease: "power3.out" },
      );
      gsap.to(counter, {
        current: value,
        duration: PLAN_MORPH_MS / 1000,
        ease: "power2.out",
        onUpdate: () => {
          element.textContent = format(Math.round(counter.current));
        },
        onComplete: () => {
          element.textContent = format(value);
        },
      });
    }, element);

    return () => context.revert();
  }, [format, reducedMotion, value]);

  return (
    <span ref={elementRef} className={className}>
      {format(value)}
    </span>
  );
}
