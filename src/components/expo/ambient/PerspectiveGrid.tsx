import styles from "../DockhubExperience.module.css";

export function PerspectiveGrid({ reducedMotion }: { reducedMotion: boolean }) {
  return <div className={`${styles.perspectiveGrid} ${reducedMotion ? styles.motionPaused : ""}`} aria-hidden />;
}
