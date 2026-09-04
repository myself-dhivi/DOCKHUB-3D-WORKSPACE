import "server-only";

import { cache } from "react";
import { z } from "zod";

import { mockRooms } from "@/data/mock-workspace";
import type { SpaceView } from "@/types/room";

const slugSchema = z.string().min(1).max(160).regex(/^[a-z0-9-]+$/);

function sortByDisplayOrder(rooms: SpaceView[]): SpaceView[] {
  return [...rooms].sort(
    (a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name),
  );
}

export const getAllSpaces = cache(async (): Promise<SpaceView[]> => {
  return sortByDisplayOrder(
    mockRooms.filter((room) => room.status !== "INACTIVE"),
  );
});

export const getShowcaseRooms = getAllSpaces;

export const getFeaturedSpaces = cache(async (): Promise<SpaceView[]> => {
  return sortByDisplayOrder(
    mockRooms.filter(
      (room) => room.status === "AVAILABLE" || room.status === "PRE_BOOKING",
    ),
  ).slice(0, 3);
});

export const getSpaceBySlug = cache(
  async (slug: string): Promise<SpaceView | null> => {
    const parsedSlug = slugSchema.safeParse(slug);
    if (!parsedSlug.success) return null;

    return mockRooms.find((room) => room.slug === parsedSlug.data) ?? null;
  },
);

export async function getAdminRooms(): Promise<SpaceView[]> {
  return sortByDisplayOrder(mockRooms);
}
