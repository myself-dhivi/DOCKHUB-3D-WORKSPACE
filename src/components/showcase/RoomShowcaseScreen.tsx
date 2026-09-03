import { Box, Container, Stack } from "@mui/material";

import type { SpaceView } from "@/types/room";
import { RoomBackdrop } from "./RoomBackdrop";
import { RoomNavigator } from "./RoomNavigator";
import { RoomOverlayPanel } from "./RoomOverlayPanel";
import { RoomThumbnails } from "./RoomThumbnails";

export function RoomShowcaseScreen({ room, rooms, activeIndex, onPrevious, onNext, onSelect }: { room: SpaceView; rooms: SpaceView[]; activeIndex: number; onPrevious: () => void; onNext: () => void; onSelect: (index: number) => void }) {
  return (
    <Box sx={{ position: "relative", minHeight: { xs: 980, sm: 900, md: "calc(100vh - 76px)" }, overflow: "hidden" }}>
      <RoomBackdrop imageUrl={room.backgroundImageUrl} roomName={room.name} priority={activeIndex === 0} />
      <Container maxWidth="xl" sx={{ position: "relative", minHeight: "inherit", display: "flex", alignItems: { xs: "flex-start", md: "center" }, justifyContent: "flex-end", pt: { xs: 4, md: 6 }, pb: { xs: 18, md: 15 } }}>
        <Box key={room.id} sx={{ animation: "roomPanelIn .42s ease both", "@keyframes roomPanelIn": { from: { opacity: 0, transform: "translateY(12px)" }, to: { opacity: 1, transform: "translateY(0)" } } }}>
          <RoomOverlayPanel room={room} />
        </Box>
        <Stack sx={{ position: "absolute", left: { xs: 16, sm: 24 }, right: { xs: 16, sm: 24 }, bottom: { xs: 22, md: 26 }, alignItems: { xs: "flex-start", md: "flex-end" }, justifyContent: "space-between", gap: 2 }} direction={{ xs: "column", md: "row" }}>
          <RoomThumbnails rooms={rooms} activeIndex={activeIndex} onSelect={onSelect} />
          <RoomNavigator current={activeIndex + 1} total={rooms.length} onPrevious={onPrevious} onNext={onNext} />
        </Stack>
      </Container>
    </Box>
  );
}
