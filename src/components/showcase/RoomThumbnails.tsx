"use client";

import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { FALLBACK_ROOM_IMAGE } from "@/lib/constants";
import type { SpaceView } from "@/types/room";

export function RoomThumbnails({ rooms, activeIndex, onSelect }: { rooms: SpaceView[]; activeIndex: number; onSelect: (index: number) => void }) {
  return (
    <Stack direction="row" spacing={1} sx={{ overflowX: "auto", py: .5, maxWidth: { xs: "calc(100vw - 32px)", md: 650 }, scrollbarWidth: "none" }}>
      {rooms.map((room, index) => (
        <ButtonBase key={room.id} onClick={() => onSelect(index)} aria-label={`Open ${room.name}`} sx={{ flex: "0 0 auto", width: 112, height: 64, position: "relative", overflow: "hidden", borderRadius: 2, border: "2px solid", borderColor: index === activeIndex ? "white" : "rgba(255,255,255,.32)", opacity: index === activeIndex ? 1 : .72 }}>
          <Image src={room.thumbnailImageUrl ?? FALLBACK_ROOM_IMAGE} alt="" fill sizes="112px" style={{ objectFit: "cover" }} />
          <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(7,25,27,.8), transparent 80%)" }} />
          <Typography variant="caption" sx={{ color: "white", position: "absolute", bottom: 5, left: 7, right: 7, textAlign: "left", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{room.name}</Typography>
        </ButtonBase>
      ))}
    </Stack>
  );
}
