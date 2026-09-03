import type { RoomPricingView } from "@/types/pricing";

export type RoomType =
  | "PRIVATE_OFFICE"
  | "PRIVATE_CABIN"
  | "CONFERENCE_ROOM"
  | "MEETING_ROOM"
  | "DEDICATED_DESK"
  | "HOT_DESK"
  | "TRAINING_ROOM"
  | "EVENT_SPACE"
  | "OPEN_WORKSPACE"
  | "RECEPTION"
  | "OTHER";

export type RoomStatus =
  | "AVAILABLE"
  | "PRE_BOOKING"
  | "COMING_SOON"
  | "OCCUPIED"
  | "INACTIVE";

export interface AvailabilityView {
  id: string;
  status: RoomStatus;
  availableSeats: number;
  validFrom: string | null;
  validUntil: string | null;
  note: string | null;
}

export interface SpaceView {
  id: string;
  code: string;
  name: string;
  slug: string;
  description: string | null;
  roomType: RoomType;
  status: RoomStatus;
  capacity: number;
  availableSeats: number;
  availableFrom: string | null;
  isPreBookingEnabled: boolean;
  backgroundImageUrl: string | null;
  thumbnailImageUrl: string | null;
  displayOrder: number;
  locationName: string | null;
  buildingName: string | null;
  floorName: string | null;
  amenities: string[];
  pricing: RoomPricingView[];
  availability: AvailabilityView[];
}

export interface WorkspaceSummaryView {
  totalCapacity: number;
  availableSpaces: number;
  preBookingSpaces: number;
  startingPrice: number | null;
  startingCurrency: string;
  locations: number;
}

export interface AdminSummaryView extends WorkspaceSummaryView {
  totalRooms: number;
  pricedSpaces: number;
  activePassPlans: number;
}
