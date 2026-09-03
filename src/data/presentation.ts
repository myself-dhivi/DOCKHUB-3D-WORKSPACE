import type { PresentationScene } from "@/types/presentation";

/** One full cinematic transition between scenes, in ms. Split evenly: cover, then reveal. */
export const TRANSITION_DURATION_MS = 1800;

/**
 * The expo-stall loop, in order. Add/remove/reorder scenes here only — every
 * presentation component renders from this array, nothing is hardcoded downstream.
 *
 * Total loop length = sum(duration) + PRESENTATION_SCENES.length * TRANSITION_DURATION_MS
 * = 5000 + 9000 + 9000 + 5000 + 4 * 1800 = 35200ms (~35s).
 */
export const PRESENTATION_SCENES: PresentationScene[] = [
  {
    id: "intro",
    type: "intro",
    duration: 5000,
    backgroundImage: "/images/rooms/reception-placeholder.jpg",
    kenBurns: { x: 0, y: -1.4 },
    brandLine: "DOCKHUB",
    title: "A BETTER WAY\nTO WORK.",
    subtitle: "Premium flexible workspaces designed for modern businesses.",
  },
  {
    id: "phase-1",
    type: "workspace",
    duration: 9000,
    backgroundImage: "/images/rooms/workspace-phase-1-placeholder.jpg",
    kenBurns: { x: 1.6, y: 0 },
    brandLine: "DOCKHUB WORKSPACE",
    title: "PHASE 01",
    capacity: 150,
    regularPrice: 9800,
    preBookingPrice: 7999,
    currency: "INR",
    priceSuffix: "PER SEAT",
    availabilityLabel: "PRE-BOOKING CLOSES",
    availabilityValue: "30 OCT",
  },
  {
    id: "phase-2",
    type: "workspace",
    duration: 9000,
    backgroundImage: "/images/rooms/workspace-phase-2-placeholder.jpg",
    kenBurns: { x: -1.6, y: 0 },
    brandLine: "DOCKHUB WORKSPACE",
    title: "PHASE 02",
    capacity: 350,
    regularPrice: 8000,
    preBookingPrice: 6499,
    currency: "INR",
    priceSuffix: "PER SEAT",
    availabilityLabel: "AVAILABLE FROM",
    availabilityValue: "01 JAN 2027",
  },
  {
    id: "closing",
    type: "closing",
    duration: 5000,
    backgroundImage: "/images/rooms/conference-room-placeholder.jpg",
    kenBurns: { x: 0, y: 1.2 },
    brandLine: "DOCKHUB",
    title: "SPACE TO\nDO MORE.",
    subtitle: "Flexible workspaces. Built for what's next.",
  },
];

/**
 * NOT YET CONFIRMED — do not surface as pricing.
 *
 * The handwritten source notes also reference a private cabin plan and a set of
 * pass/pre-booking figures (6, 12, 15, 100, 200, 200) without labels tying the
 * numbers to seats, price, or duration. Once the business team confirms what
 * each value means, add a scene object to PRESENTATION_SCENES above — the type
 * already supports it (type: "workspace", plus whichever of capacity /
 * regularPrice / preBookingPrice / availabilityValue apply). Nothing else in
 * the presentation needs to change to pick it up.
 */
