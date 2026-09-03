import {
  PrismaClient,
  PricingPeriod,
  RoomStatus,
  RoomType,
} from "@prisma/client";

const prisma = new PrismaClient();

const IDS = {
  location: "seed-location-dockhub",
  pricingPlan: "seed-plan-per-seat",
  phaseOne: "seed-room-workspace-phase-1",
  phaseTwo: "seed-room-workspace-phase-2",
  phaseOnePrice: "seed-price-workspace-phase-1",
  phaseTwoPrice: "seed-price-workspace-phase-2",
  phaseOneAvailability: "seed-availability-workspace-phase-1",
  phaseTwoAvailability: "seed-availability-workspace-phase-2",
} as const;

/**
 * Business-source notes
 * ---------------------
 * Confirmed from the handwritten requirement:
 * - Phase 1: capacity 150, regular INR 9,800, pre-booking INR 7,999.
 * - Phase 2: capacity 350, regular INR 8,000, pre-booking INR 6,499,
 *   available from 2027-01-01.
 *
 * Deliberately unresolved:
 * - Phase 1 says "30 Oct", but no year is confirmed. `availableFrom` and the
 *   price effective date therefore remain null; the text is retained on the
 *   availability timeline note.
 * - The pricing period is not confirmed. A CUSTOM plan is used and named as
 *   per-seat pricing without implying hourly, daily, or monthly validity.
 * - The handwritten private-cabin/pass values around 6/12/15 and
 *   100/200/200 have unclear units and meaning. No PassPlan rows are created.
 * - `availableSeats` for the two workspaces mirrors capacity for the initial
 *   pre-booking showcase. Operations must confirm live inventory later.
 *
 * Showcase-only supporting rooms are visibly marked COMING_SOON. Their
 * capacities are illustrative structural values and they intentionally have
 * no commercial pricing or availability records.
 */

const supportingRooms = [
  {
    id: "seed-room-reception",
    code: "RECEPTION-001",
    name: "Dockhub Reception",
    slug: "dockhub-reception",
    description:
      "A welcoming arrival space for the guided Dockhub showcase. Final operating details require confirmation.",
    roomType: RoomType.RECEPTION,
    capacity: 12,
    image: "/images/rooms/reception-placeholder.jpg",
    displayOrder: 1,
  },
  {
    id: "seed-room-conference",
    code: "CONFERENCE-001",
    name: "Executive Conference Room",
    slug: "executive-conference-room",
    description:
      "A premium conference-room showcase record. Final capacity, availability, amenities, and pricing require confirmation.",
    roomType: RoomType.CONFERENCE_ROOM,
    capacity: 14,
    image: "/images/rooms/conference-room-placeholder.jpg",
    displayOrder: 2,
  },
  {
    id: "seed-room-private-cabin",
    code: "CABIN-001",
    name: "Executive Private Cabin",
    slug: "executive-private-cabin",
    description:
      "A private-cabin showcase record. Final capacity, availability, amenities, and pricing require confirmation.",
    roomType: RoomType.PRIVATE_CABIN,
    capacity: 1,
    image: "/images/rooms/private-cabin-placeholder.jpg",
    displayOrder: 3,
  },
  {
    id: "seed-room-meeting",
    code: "MEETING-001",
    name: "Meeting Room",
    slug: "meeting-room",
    description:
      "A collaborative meeting-room showcase record. Final capacity, availability, amenities, and pricing require confirmation.",
    roomType: RoomType.MEETING_ROOM,
    capacity: 6,
    image: "/images/rooms/meeting-room-placeholder.jpg",
    displayOrder: 4,
  },
] as const;

async function upsertSupportingRooms(locationId: string) {
  for (const room of supportingRooms) {
    const data = {
      code: room.code,
      name: room.name,
      slug: room.slug,
      description: room.description,
      roomType: room.roomType,
      status: RoomStatus.COMING_SOON,
      capacity: room.capacity,
      availableSeats: 0,
      locationId,
      isPreBookingEnabled: false,
      backgroundImageUrl: room.image,
      thumbnailImageUrl: room.image,
      displayOrder: room.displayOrder,
    };

    await prisma.room.upsert({
      where: { id: room.id },
      update: data,
      create: { id: room.id, ...data },
    });
  }
}

async function main() {
  const location = await prisma.location.upsert({
    where: { id: IDS.location },
    update: { name: "Dockhub — location to be confirmed" },
    create: {
      id: IDS.location,
      name: "Dockhub — location to be confirmed",
    },
  });

  await upsertSupportingRooms(location.id);

  const phaseOneData = {
    code: "WORKSPACE-001",
    name: "Dockhub Workspace - Phase 1",
    slug: "dockhub-workspace-phase-1",
    description:
      "A 150-seat open workspace currently available for pre-booking. Final opening year for the handwritten 30 Oct date is awaiting confirmation.",
    roomType: RoomType.OPEN_WORKSPACE,
    status: RoomStatus.PRE_BOOKING,
    capacity: 150,
    availableSeats: 150,
    locationId: location.id,
    availableFrom: null,
    isPreBookingEnabled: true,
    backgroundImageUrl: "/images/rooms/workspace-phase-1-placeholder.jpg",
    thumbnailImageUrl: "/images/rooms/workspace-phase-1-placeholder.jpg",
    displayOrder: 5,
  };
  const phaseOne = await prisma.room.upsert({
    where: { id: IDS.phaseOne },
    update: phaseOneData,
    create: { id: IDS.phaseOne, ...phaseOneData },
  });

  const phaseTwoAvailableFrom = new Date("2027-01-01T00:00:00.000Z");
  const phaseTwoData = {
    code: "WORKSPACE-002",
    name: "Dockhub Workspace - Phase 2",
    slug: "dockhub-workspace-phase-2",
    description:
      "A 350-seat open workspace available for pre-booking ahead of its planned January 2027 availability.",
    roomType: RoomType.OPEN_WORKSPACE,
    status: RoomStatus.PRE_BOOKING,
    capacity: 350,
    availableSeats: 350,
    locationId: location.id,
    availableFrom: phaseTwoAvailableFrom,
    isPreBookingEnabled: true,
    backgroundImageUrl: "/images/rooms/workspace-phase-2-placeholder.jpg",
    thumbnailImageUrl: "/images/rooms/workspace-phase-2-placeholder.jpg",
    displayOrder: 6,
  };
  const phaseTwo = await prisma.room.upsert({
    where: { id: IDS.phaseTwo },
    update: phaseTwoData,
    create: { id: IDS.phaseTwo, ...phaseTwoData },
  });

  const pricingPlan = await prisma.pricingPlan.upsert({
    where: { id: IDS.pricingPlan },
    update: {
      name: "Per-seat pricing (period to be confirmed)",
      period: PricingPeriod.CUSTOM,
      description:
        "Per-seat pricing from the initial handwritten requirement; billing period requires confirmation.",
      isActive: true,
    },
    create: {
      id: IDS.pricingPlan,
      name: "Per-seat pricing (period to be confirmed)",
      period: PricingPeriod.CUSTOM,
      description:
        "Per-seat pricing from the initial handwritten requirement; billing period requires confirmation.",
      isActive: true,
    },
  });

  await prisma.roomPricing.upsert({
    where: { id: IDS.phaseOnePrice },
    update: {
      roomId: phaseOne.id,
      pricingPlanId: pricingPlan.id,
      regularPrice: 9800,
      offerPrice: null,
      preBookingPrice: 7999,
      currency: "INR",
      effectiveFrom: null,
      effectiveUntil: null,
      isActive: true,
    },
    create: {
      id: IDS.phaseOnePrice,
      roomId: phaseOne.id,
      pricingPlanId: pricingPlan.id,
      regularPrice: 9800,
      preBookingPrice: 7999,
      currency: "INR",
      isActive: true,
    },
  });

  await prisma.roomPricing.upsert({
    where: { id: IDS.phaseTwoPrice },
    update: {
      roomId: phaseTwo.id,
      pricingPlanId: pricingPlan.id,
      regularPrice: 8000,
      offerPrice: null,
      preBookingPrice: 6499,
      currency: "INR",
      effectiveFrom: phaseTwoAvailableFrom,
      effectiveUntil: null,
      isActive: true,
    },
    create: {
      id: IDS.phaseTwoPrice,
      roomId: phaseTwo.id,
      pricingPlanId: pricingPlan.id,
      regularPrice: 8000,
      preBookingPrice: 6499,
      currency: "INR",
      effectiveFrom: phaseTwoAvailableFrom,
      isActive: true,
    },
  });

  await prisma.roomAvailability.upsert({
    where: { id: IDS.phaseOneAvailability },
    update: {
      roomId: phaseOne.id,
      status: RoomStatus.PRE_BOOKING,
      availableSeats: 150,
      validFrom: null,
      validUntil: null,
      note: "Handwritten source states 30 Oct; year requires confirmation.",
    },
    create: {
      id: IDS.phaseOneAvailability,
      roomId: phaseOne.id,
      status: RoomStatus.PRE_BOOKING,
      availableSeats: 150,
      note: "Handwritten source states 30 Oct; year requires confirmation.",
    },
  });

  await prisma.roomAvailability.upsert({
    where: { id: IDS.phaseTwoAvailability },
    update: {
      roomId: phaseTwo.id,
      status: RoomStatus.PRE_BOOKING,
      availableSeats: 350,
      validFrom: phaseTwoAvailableFrom,
      validUntil: null,
      note: "Available from 01 January 2027.",
    },
    create: {
      id: IDS.phaseTwoAvailability,
      roomId: phaseTwo.id,
      status: RoomStatus.PRE_BOOKING,
      availableSeats: 350,
      validFrom: phaseTwoAvailableFrom,
      note: "Available from 01 January 2027.",
    },
  });

  console.info("Seeded 6 showcase rooms, 2 pricing records, and 0 pass plans.");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
