"use client";

import { useEffect, useRef } from "react";
import { Camera, Renderer, Transform, type Mesh } from "ogl";

import { createAccentSphere } from "./AccentSphere";
import { createDepthPlane } from "./DepthPlane";
import { createFloatingRing } from "./FloatingRing";
import { createGlassOrb } from "./GlassOrb";
import styles from "../DockhubExperience.module.css";

export function AmbientScene({ reducedMotion }: { reducedMotion: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 1.1),
      powerPreference: "high-performance",
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.setAttribute("aria-hidden", "true");
    container.appendChild(canvas);

    const camera = new Camera(gl, { fov: 34, near: 0.1, far: 100 });
    camera.position.z = 8;
    const scene = new Transform();

    const blueRing = createFloatingRing(gl, "#4B73D1", 0.48);
    blueRing.position.set(4.25, 1.18, -0.7);
    blueRing.scale.set(1.42, 1.42, 1.42);
    blueRing.rotation.set(0.85, -0.5, 0.05);
    blueRing.setParent(scene);

    const goldRing = createFloatingRing(gl, "#F5BD1E", 0.2);
    goldRing.position.set(-4.32, -2.15, -1.5);
    goldRing.scale.set(0.82, 0.82, 0.82);
    goldRing.rotation.set(1.15, 0.38, -0.2);
    goldRing.setParent(scene);

    const glassOrb = createGlassOrb(gl);
    glassOrb.position.set(-3.58, 1.82, -1.2);
    glassOrb.scale.set(1, 1, 1);
    glassOrb.setParent(scene);

    const accentSphere = createAccentSphere(gl);
    accentSphere.position.set(3.52, -1.78, 0.2);
    accentSphere.setParent(scene);

    const depthPlane = createDepthPlane(gl);
    depthPlane.position.set(2.75, -0.25, -2.7);
    depthPlane.rotation.set(0.12, -0.6, 0.08);
    depthPlane.setParent(scene);

    const meshes: Mesh[] = [blueRing, goldRing, glassOrb, accentSphere, depthPlane];

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(Math.max(1, width), Math.max(1, height));
      camera.perspective({ aspect: width / Math.max(1, height) });
      renderer.render({ scene, camera });
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let frame = 0;
    let inViewport = true;
    let pageVisible = !document.hidden;
    const startedAt = performance.now();

    const render = (time: number) => {
      const elapsed = (time - startedAt) * 0.001;
      blueRing.rotation.y = -0.5 + elapsed * 0.035;
      blueRing.rotation.z = 0.05 + Math.sin(elapsed * 0.22) * 0.035;
      goldRing.rotation.x = 1.15 - elapsed * 0.025;
      glassOrb.position.y = 1.82 + Math.sin(elapsed * 0.35) * 0.08;
      glassOrb.rotation.y = elapsed * 0.055;
      accentSphere.position.y = -1.78 + Math.sin(elapsed * 0.42) * 0.1;
      depthPlane.rotation.y = -0.6 + Math.sin(elapsed * 0.18) * 0.055;
      renderer.render({ scene, camera });
      frame = requestAnimationFrame(render);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const start = () => {
      if (!reducedMotion && inViewport && pageVisible && !frame) frame = requestAnimationFrame(render);
    };

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      if (inViewport) start();
      else stop();
    });
    intersectionObserver.observe(container);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      meshes.forEach((mesh) => {
        mesh.geometry.remove();
        mesh.program.remove();
      });
      canvas.remove();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [reducedMotion]);

  return <div ref={containerRef} className={styles.ambientScene} aria-hidden />;
}
