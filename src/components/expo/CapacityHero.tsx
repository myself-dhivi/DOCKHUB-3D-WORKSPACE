import type { PreBookingPlan } from "@/data/workspace-plans";
import { MorphingNumber } from "./MorphingNumber";
import styles from "./DockhubExperience.module.css";

export function CapacityHero({ plan, reducedMotion }: { plan: PreBookingPlan; reducedMotion: boolean }) {
  return (
    <div className={styles.capacityHero} data-intro="capacity">
      <span className={styles.metricKicker}>TOTAL CAPACITY</span>
      <div className={styles.capacityValue}>
        <MorphingNumber value={plan.capacity} reducedMotion={reducedMotion} />
      </div>
      <div className={styles.capacityFooter}>
        <span className={styles.metricLine} aria-hidden />
        <span>SEATS</span>
      </div>
    </div>
  );
}
