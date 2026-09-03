import type { PreBookingPlan } from "@/data/workspace-plans";
import { MorphingNumber } from "./MorphingNumber";
import styles from "./DockhubExperience.module.css";

const formatPrice = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export function PriceHero({ plan, reducedMotion }: { plan: PreBookingPlan; reducedMotion: boolean }) {
  return (
    <div className={styles.priceHero} data-intro="price">
      <div className={styles.priceHalo} aria-hidden />
      <span className={styles.priceLabel}>PRE-BOOKING</span>
      <div className={styles.priceLockup}>
        <MorphingNumber value={plan.preBookingPrice} format={formatPrice} reducedMotion={reducedMotion} className={styles.priceValue} />
        <span className={styles.priceSuffix}>/ SEAT</span>
      </div>
      <div className={styles.regularPrice}>
        <span>REGULAR</span>
        <MorphingNumber value={plan.regularPrice} format={formatPrice} reducedMotion={reducedMotion} />
        <span className={styles.regularSeat}> / SEAT</span>
      </div>
      <span className={styles.priceEdge} aria-hidden />
    </div>
  );
}
