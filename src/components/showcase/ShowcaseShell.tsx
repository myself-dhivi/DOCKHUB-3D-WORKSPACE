"use client";

import { useMemo, useState } from "react";

import type { SpaceView } from "@/types/room";
import { RoomShowcaseScreen } from "./RoomShowcaseScreen";

export function ShowcaseShell({ rooms, initialSlug }: { rooms: SpaceView[]; initialSlug?: string }) {
  const initialIndex = useMemo(() => Math.max(0, rooms.findIndex((room) => room.slug === initialSlug)), [initialSlug, rooms]);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const room = rooms[activeIndex];
  if (!room) return null;

  const previous = () => setActiveIndex((index) => (index - 1 + rooms.length) % rooms.length);
  const next = () => setActiveIndex((index) => (index + 1) % rooms.length);

  return <RoomShowcaseScreen room={room} rooms={rooms} activeIndex={activeIndex} onPrevious={previous} onNext={next} onSelect={setActiveIndex} />;
}
