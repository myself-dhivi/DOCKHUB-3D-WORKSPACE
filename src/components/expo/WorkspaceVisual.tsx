import Image from "next/image";

import { WORKSPACE_PLANS } from "@/data/workspace-plans";
import styles from "./DockhubExperience.module.css";

export function WorkspaceVisual({ activeIndex }: { activeIndex: number }) {
  return (
    <div className={styles.visualStage} data-intro="room" aria-hidden>
      <div className={styles.roomDepthShadow} />
      <div className={styles.roomImageShell}>
        {WORKSPACE_PLANS.map((plan, index) => (
          <div
            key={plan.id}
            className={`${styles.roomImageLayer} ${index === activeIndex ? styles.roomImageActive : ""}`}
          >
            <Image
              src={plan.image}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: plan.imagePosition }}
            />
          </div>
        ))}
        <div className={styles.roomGrade} />
        <div className={styles.roomRefraction} />
      </div>
      <div className={styles.foregroundGlass} />
      <div className={styles.floorReflection} />
    </div>
  );
}
