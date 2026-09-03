"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

import type { SceneContentState } from "@/components/presentation/PresentationScene";

/**
 * Shared entrance/exit choreography for a scene's content layer. The
 * `[data-anim="title"]` node (see SceneTitle) gets a 3D flip-up; every other
 * `[data-anim]` node gets a simpler rise-and-fade, staggered per `delays`
 * (a stable, module-level map of data-anim key → seconds).
 */
export function useSceneEntrance(state: SceneContentState, reducedMotion: boolean, delays: Record<string, number>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    timelineRef.current?.kill();

    const titleEl = root.querySelector<HTMLElement>('[data-anim="title"]');
    const otherNodes = gsap.utils.toArray<HTMLElement>("[data-anim]", root).filter((node) => node !== titleEl);
    const allNodes = titleEl ? [titleEl, ...otherNodes] : otherNodes;

    if (reducedMotion) {
      gsap.set(allNodes, { opacity: state === "hidden" ? 0 : 1, y: 0, rotateX: 0 });
      return;
    }

    if (state === "entering") {
      if (titleEl) {
        gsap.set(titleEl, { opacity: 0, rotateX: -75, transformPerspective: 1000, transformOrigin: "50% 100%" });
      }
      gsap.set(otherNodes, { opacity: 0, y: 28 });

      const tl = gsap.timeline();
      if (titleEl) tl.to(titleEl, { opacity: 1, rotateX: 0, duration: 0.9, ease: "power3.out" }, delays.title ?? 0.3);
      otherNodes.forEach((node) => {
        const key = node.dataset.anim ?? "";
        tl.to(node, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, delays[key] ?? 0.3);
      });
      timelineRef.current = tl;
    } else if (state === "exiting") {
      timelineRef.current = gsap.to(allNodes, { opacity: 0, y: -18, duration: 0.45, ease: "power2.in", stagger: 0.03 });
    } else if (state === "hidden") {
      if (titleEl) gsap.set(titleEl, { opacity: 0, rotateX: -75 });
      gsap.set(otherNodes, { opacity: 0, y: 28 });
    } else {
      gsap.set(allNodes, { opacity: 1, y: 0, rotateX: 0 });
    }

    return () => {
      timelineRef.current?.kill();
    };
  }, [state, reducedMotion, delays]);

  return rootRef;
}
