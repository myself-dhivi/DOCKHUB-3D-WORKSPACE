import type { Metadata } from "next";

import { EmptyState } from "@/components/common/EmptyState";
import { ShowcaseShell } from "@/components/showcase/ShowcaseShell";
import { getShowcaseRooms } from "@/services/rooms.service";

export const metadata: Metadata = {
  title: "Room Showcase",
  description: "Move room by room through the Dockhub workspace showcase.",
};
export const dynamic = "force-dynamic";

export default async function ShowcasePage({ searchParams }: { searchParams: Promise<{ space?: string | string[] }> }) {
  const [rooms, query] = await Promise.all([getShowcaseRooms(), searchParams]);
  if (!rooms.length) return <EmptyState title="No rooms to showcase yet" description="Seed the database to load the initial Dockhub room tour." />;

  const requestedSpace = Array.isArray(query.space) ? query.space[0] : query.space;
  return <ShowcaseShell rooms={rooms} initialSlug={requestedSpace} />;
}
