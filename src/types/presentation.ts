export type PresentationSceneType = "intro" | "workspace" | "closing";

/** Slow Ken Burns drift applied to a scene's background for the full time it's on screen. */
export interface KenBurnsDirection {
  /** Horizontal drift in %, applied via translateX. Positive drifts right. */
  x: number;
  /** Vertical drift in %, applied via translateY. Positive drifts down. */
  y: number;
}

export interface PresentationScene {
  id: string;
  type: PresentationSceneType;
  /** How long the scene holds on screen, in ms (excludes the transition either side). */
  duration: number;
  backgroundImage: string;
  kenBurns: KenBurnsDirection;
  /** Small superheading, e.g. "DOCKHUB" or "DOCKHUB WORKSPACE". */
  brandLine?: string;
  /** Main heading. Use "\n" for a manual line break. */
  title: string;
  subtitle?: string;
  capacity?: number;
  regularPrice?: number;
  preBookingPrice?: number;
  currency?: "INR";
  priceSuffix?: string;
  availabilityLabel?: string;
  availabilityValue?: string;
}

/** Foreground timeline step. Background/content only ever swap on the cover→reveal edge. */
export type TimelineStep = "scene" | "cover" | "reveal";

export interface PresentationTimelineState {
  /** Index of the scene currently in the foreground. */
  activeIndex: number;
  step: TimelineStep;
}
