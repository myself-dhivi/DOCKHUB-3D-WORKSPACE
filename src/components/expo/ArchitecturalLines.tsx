import styles from "./DockhubExperience.module.css";

export function ArchitecturalLines() {
  return (
    <div className={styles.architecturalLines} data-intro="architecture" aria-hidden>
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="none">
        <path className={styles.linePrimary} d="M62 207H337L382 162H913" />
        <path className={styles.lineSecondary} d="M1410 112H1816V397" />
        <path className={styles.linePrimary} d="M1572 924H1802V687" />
        <path className={styles.lineGhost} d="M0 879H458L527 810H1020" />
        <path className={styles.lineGhost} d="M1051 188L1195 44H1478" />
        <circle cx="382" cy="162" r="4" />
        <circle cx="1572" cy="924" r="4" />
      </svg>
      <span className={styles.architectureTickOne} />
      <span className={styles.architectureTickTwo} />
    </div>
  );
}
