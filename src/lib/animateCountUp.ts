import gsap from "gsap";

/** Tweens a plain number from 0 → target, writing the formatted value into `el` each frame. */
export function animateCountUp(el: HTMLElement, target: number, opts: { duration?: number; format: (n: number) => string }): gsap.core.Tween {
  const state = { value: 0 };
  return gsap.to(state, {
    value: target,
    duration: opts.duration ?? 1.3,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = opts.format(Math.round(state.value));
    },
  });
}
