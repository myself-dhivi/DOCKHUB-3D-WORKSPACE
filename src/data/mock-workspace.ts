import type { PassPlanView } from "@/types/pass";
import type { PricingPlanView } from "@/types/pricing";
import type { SpaceView } from "@/types/room";

/**
 * Static stand-in for the workspace database.
 *
 * This mirrors the values that previously lived in `prisma/seed.ts` so the
 * public site and the read-only admin views render the same confirmed
 * numbers with no database, migrations, or `DATABASE_URL` involved.
 *
 * Business-source notes (carried over from the former seed):
 * - Phase 1: capacity 150, regular INR 9,800, pre-booking INR 7,999.
 * - Phase 2: capacity 350, regular INR 8,000, pre-booking INR 6,499,
 *   available from 2027-01-01.
 * - The Phase 1 "30 Oct" date has no confirmed year, so `availableFrom`
 *   stays null; the text lives only in the availability note.
 * - The pricing period is unconfirmed, hence the `CUSTOM` plan.
 * - No pass plans are published yet.
 */

const LOCATION_NAME = "Dockhub — location to be confirmed";

const PER_SEAT_PLAN = {
  id: "seed-plan-per-seat",
  name: "Per-seat pricing (period to be confirmed)",
  period: "CUSTOM",
  description:
    "Per-seat pricing from the initial handwritten requirement; billing period requires confirmation.",
  isActive: true,
} as const satisfies PricingPlanView;

export const mockPricingPlans: PricingPlanView[] = [PER_SEAT_PLAN];

export const mockRooms: SpaceView[] = [
  {
    id: "seed-room-reception",
    code: "RECEPTION-001",
    name: "Dockhub Reception",
    slug: "dockhub-reception",
    description:
      "A welcoming arrival space for the guided Dockhub showcase. Final operating details require confirmation.",
    roomType: "RECEPTION",
    status: "COMING_SOON",
    capacity: 12,
    availableSeats: 0,
    availableFrom: null,
    isPreBookingEnabled: false,
    backgroundImageUrl: "/images/rooms/reception-placeholder.jpg",
    thumbnailImageUrl: "/images/rooms/reception-placeholder.jpg",
    displayOrder: 1,
    locationName: LOCATION_NAME,
    buildingName: null,
    floorName: null,
    amenities: [],
    pricing: [],
    availability: [],
  },
  {
    id: "seed-room-conference",
    code: "CONFERENCE-001",
    name: "Executive Conference Room",
    slug: "executive-conference-room",
    description:
      "A premium conference-room showcase record. Final capacity, availability, amenities, and pricing require confirmation.",
    roomType: "CONFERENCE_ROOM",
    status: "COMING_SOON",
    capacity: 14,
    availableSeats: 0,
    availableFrom: null,
    isPreBookingEnabled: false,
    backgroundImageUrl: "/images/rooms/conference-room-placeholder.jpg",
    thumbnailImageUrl: "/images/rooms/conference-room-placeholder.jpg",
    displayOrder: 2,
    locationName: LOCATION_NAME,
    buildingName: null,
    floorName: null,
    amenities: [],
    pricing: [],
    availability: [],
  },
  {
    id: "seed-room-private-cabin",
    code: "CABIN-001",
    name: "Executive Private Cabin",
    slug: "executive-private-cabin",
    description:
      "A private-cabin showcase record. Final capacity, availability, amenities, and pricing require confirmation.",
    roomType: "PRIVATE_CABIN",
    status: "COMING_SOON",
    capacity: 1,
    availableSeats: 0,
    availableFrom: null,
    isPreBookingEnabled: false,
    backgroundImageUrl: "/images/rooms/private-cabin-placeholder.jpg",
    thumbnailImageUrl: "/images/rooms/private-cabin-placeholder.jpg",
    displayOrder: 3,
    locationName: LOCATION_NAME,
    buildingName: null,
    floorName: null,
    amenities: [],
    pricing: [],
    availability: [],
  },
  {
    id: "seed-room-meeting",
    code: "MEETING-001",
    name: "Meeting Room",
    slug: "meeting-room",
    description:
      "A collaborative meeting-room showcase record. Final capacity, availability, amenities, and pricing require confirmation.",
    roomType: "MEETING_ROOM",
    status: "COMING_SOON",
    capacity: 6,
    availableSeats: 0,
    availableFrom: null,
    isPreBookingEnabled: false,
    backgroundImageUrl: "/images/rooms/meeting-room-placeholder.jpg",
    thumbnailImageUrl: "/images/rooms/meeting-room-placeholder.jpg",
    displayOrder: 4,
    locationName: LOCATION_NAME,
    buildingName: null,
    floorName: null,
    amenities: [],
    pricing: [],
    availability: [],
  },
  {
    id: "seed-room-workspace-phase-1",
    code: "WORKSPACE-001",
    name: "Dockhub Workspace - Phase 1",
    slug: "dockhub-workspace-phase-1",
    description:
      "A 150-seat open workspace currently available for pre-booking. Final opening year for the handwritten 30 Oct date is awaiting confirmation.",
    roomType: "OPEN_WORKSPACE",
    status: "PRE_BOOKING",
    capacity: 150,
    availableSeats: 150,
    availableFrom: null,
    isPreBookingEnabled: true,
    backgroundImageUrl: "/images/rooms/workspace-phase-1-placeholder.jpg",
    thumbnailImageUrl: "/images/rooms/workspace-phase-1-placeholder.jpg",
    displayOrder: 5,
    locationName: LOCATION_NAME,
    buildingName: null,
    floorName: null,
    amenities: [],
    pricing: [
      {
        id: "seed-price-workspace-phase-1",
        roomId: "seed-room-workspace-phase-1",
        roomName: "Dockhub Workspace - Phase 1",
        roomSlug: "dockhub-workspace-phase-1",
        planName: PER_SEAT_PLAN.name,
        period: PER_SEAT_PLAN.period,
        planDescription: PER_SEAT_PLAN.description,
        regularPrice: 9800,
        offerPrice: null,
        preBookingPrice: 7999,
        currency: "INR",
        effectiveFrom: null,
        effectiveUntil: null,
        isActive: true,
      },
    ],
    availability: [
      {
        id: "seed-availability-workspace-phase-1",
        status: "PRE_BOOKING",
        availableSeats: 150,
        validFrom: null,
        validUntil: null,
        note: "Handwritten source states 30 Oct; year requires confirmation.",
      },
    ],
  },
  {
    id: "seed-room-workspace-phase-2",
    code: "WORKSPACE-002",
    name: "Dockhub Workspace - Phase 2",
    slug: "dockhub-workspace-phase-2",
    description:
      "A 350-seat open workspace available for pre-booking ahead of its planned January 2027 availability.",
    roomType: "OPEN_WORKSPACE",
    status: "PRE_BOOKING",
    capacity: 350,
    availableSeats: 350,
    availableFrom: "2027-01-01T00:00:00.000Z",
    isPreBookingEnabled: true,
    backgroundImageUrl: "/images/rooms/workspace-phase-2-placeholder.jpg",
    thumbnailImageUrl: "/images/rooms/workspace-phase-2-placeholder.jpg",
    displayOrder: 6,
    locationName: LOCATION_NAME,
    buildingName: null,
    floorName: null,
    amenities: [],
    pricing: [
      {
        id: "seed-price-workspace-phase-2",
        roomId: "seed-room-workspace-phase-2",
        roomName: "Dockhub Workspace - Phase 2",
        roomSlug: "dockhub-workspace-phase-2",
        planName: PER_SEAT_PLAN.name,
        period: PER_SEAT_PLAN.period,
        planDescription: PER_SEAT_PLAN.description,
        regularPrice: 8000,
        offerPrice: null,
        preBookingPrice: 6499,
        currency: "INR",
        effectiveFrom: "2027-01-01T00:00:00.000Z",
        effectiveUntil: null,
        isActive: true,
      },
    ],
    availability: [
      {
        id: "seed-availability-workspace-phase-2",
        status: "PRE_BOOKING",
        availableSeats: 350,
        validFrom: "2027-01-01T00:00:00.000Z",
        validUntil: null,
        note: "Available from 01 January 2027.",
      },
    ],
  },
];

// No pass plans are confirmed yet — kept as an empty list rather than
// invented data, matching the former seed's "0 pass plans" state.
export const mockPassPlans: PassPlanView[] = [];
