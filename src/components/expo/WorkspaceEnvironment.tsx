import type { WorkspacePlan } from "@/data/workspace-plans";
import type { WorkspaceRotationStage } from "@/hooks/useWorkspaceRotation";
import { AmbientScene } from "./ambient/AmbientScene";
import { AmbientTunnel } from "./ambient/AmbientTunnel";
import { PerspectiveGrid } from "./ambient/PerspectiveGrid";
import { ArchitecturalLines } from "./ArchitecturalLines";
import { PlanTransition } from "./PlanTransition";
import { WorkspaceData } from "./WorkspaceData";
import { WorkspaceVisual } from "./WorkspaceVisual";
import styles from "./DockhubExperience.module.css";

interface WorkspaceEnvironmentProps {
  activeIndex: number;
  plan: WorkspacePlan;
  stage: WorkspaceRotationStage;
  reducedMotion: boolean;
}

export function WorkspaceEnvironment({ activeIndex, plan, stage, reducedMotion }: WorkspaceEnvironmentProps) {
  return (
    <div className={styles.environment}>
      <div className={styles.ambientWash} aria-hidden />
      <AmbientTunnel reducedMotion={reducedMotion} />
      <PerspectiveGrid reducedMotion={reducedMotion} />
      <WorkspaceVisual activeIndex={activeIndex} />
      <AmbientScene reducedMotion={reducedMotion} />
      <ArchitecturalLines />
      <WorkspaceData plan={plan} reducedMotion={reducedMotion} />
      <PlanTransition stage={stage} reducedMotion={reducedMotion} />
      <div className={styles.texture} aria-hidden />
      <div className={styles.vignette} aria-hidden />
    </div>
  );
}
