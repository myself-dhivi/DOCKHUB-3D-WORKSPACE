"use client";

import LightTunnel from "@/components/effects/LightTunnel";
import styles from "../DockhubExperience.module.css";

export function AmbientTunnel({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) return <div className={styles.ambientTunnel} aria-hidden />;

  return (
    <div className={styles.ambientTunnel} aria-hidden>
      <LightTunnel
        cableColor="#184091"
        pulseColor="#F5BD1E"
        tunnelColor="#184091"
        tunnelOpacity={0.025}
        speed={0.05}
        flowDirection="inward"
        pulseSpeed={1}
        pulseLength={0.24}
        pulseBlend={0.86}
        pulseWidth={0.72}
        cableCount={18}
        thickness={0.23}
        rimWidth={0.1}
        waviness={0.12}
        sway={0.12}
        size={0.88}
        centerX={0.12}
        centerY={0}
        glow={0.65}
        fadeNear={0.44}
        fadeFar={1.8}
        brightness={0.6}
        colorVariance={false}
        grain={false}
        opacity={0.15}
        mouseInteraction={false}
      />
    </div>
  );
}
