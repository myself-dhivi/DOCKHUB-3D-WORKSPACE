import "server-only";

import { Prisma, RoomStatus } from "@prisma/client";
import { cache } from "react";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import type { SpaceView } from "@/types/room";

const slugSchema = z.string().min(1).max(160).regex(/^[a-z0-9-]+$/);

const roomInclude = {
  location: true,
  building: true,
  floor: true,
  amenities: {
    include: { amenity: true },
    orderBy: { amenity: { name: "asc" as const } },
  },
  pricing: {
    where: { isActive: true },
    include: { pricingPlan: true },
    orderBy: { createdAt: "asc" as const },
  },
  availability: {
    orderBy: [{ validFrom: "asc" as const }, { createdAt: "asc" as const }],
  },
} satisfies Prisma.RoomInclude;

type RoomWithRelations = Prisma.RoomGetPayload<{ include: typeof roomInclude }>;

function toSpaceView(room: RoomWithRelations): SpaceView {
  return {
    id: room.id,
    code: room.code,
    name: room.name,
    slug: room.slug,
    description: room.description,
    roomType: room.roomType,
    status: room.status,
    capacity: room.capacity,
    availableSeats: room.availableSeats,
    availableFrom: room.availableFrom?.toISOString() ?? null,
    isPreBookingEnabled: room.isPreBookingEnabled,
    backgroundImageUrl: room.backgroundImageUrl,
    thumbnailImageUrl: room.thumbnailImageUrl,
    displayOrder: room.displayOrder,
    locationName: room.location?.name ?? null,
    buildingName: room.building?.name ?? null,
    floorName: room.floor?.name ?? null,
    amenities: room.amenities.map(({ amenity }) => amenity.name),
    pricing: room.pricing.map((price) => ({
      id: price.id,
      roomId: room.id,
      roomName: room.name,
      roomSlug: room.slug,
      planName: price.pricingPlan.name,
      period: price.pricingPlan.period,
      planDescription: price.pricingPlan.description,
      regularPrice: price.regularPrice.toNumber(),
      offerPrice: price.offerPrice?.toNumber() ?? null,
      preBookingPrice: price.preBookingPrice?.toNumber() ?? null,
      currency: price.currency,
      effectiveFrom: price.effectiveFrom?.toISOString() ?? null,
      effectiveUntil: price.effectiveUntil?.toISOString() ?? null,
      isActive: price.isActive,
    })),
    availability: room.availability.map((entry) => ({
      id: entry.id,
      status: entry.status,
      availableSeats: entry.availableSeats,
      validFrom: entry.validFrom?.toISOString() ?? null,
      validUntil: entry.validUntil?.toISOString() ?? null,
      note: entry.note,
    })),
  };
}

export const getAllSpaces = cache(async (): Promise<SpaceView[]> => {
  const rooms = await prisma.room.findMany({
    where: { status: { not: RoomStatus.INACTIVE } },
    include: roomInclude,
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });

  return rooms.map(toSpaceView);
});

export const getShowcaseRooms = getAllSpaces;

export const getFeaturedSpaces = cache(async (): Promise<SpaceView[]> => {
  const rooms = await prisma.room.findMany({
    where: { status: { in: [RoomStatus.AVAILABLE, RoomStatus.PRE_BOOKING] } },
    include: roomInclude,
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
    take: 3,
  });

  return rooms.map(toSpaceView);
});

export const getSpaceBySlug = cache(
  async (slug: string): Promise<SpaceView | null> => {
    const parsedSlug = slugSchema.safeParse(slug);
    if (!parsedSlug.success) return null;

    const room = await prisma.room.findUnique({
      where: { slug: parsedSlug.data },
      include: roomInclude,
    });

    return room ? toSpaceView(room) : null;
  },
);

export async function getAdminRooms(): Promise<SpaceView[]> {
  const rooms = await prisma.room.findMany({
    include: roomInclude,
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }],
  });

  return rooms.map(toSpaceView);
}
