import { Box } from "@mui/material";
import Image from "next/image";

import { FALLBACK_ROOM_IMAGE } from "@/lib/constants";

export function RoomBackdrop({ imageUrl, roomName, priority = false }: { imageUrl: string | null; roomName: string; priority?: boolean }) {
  return (
    <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", bgcolor: "#dfe6e2" }}>
      <Image src={imageUrl ?? FALLBACK_ROOM_IMAGE} alt={`${roomName} interior`} fill priority={priority} sizes="100vw" style={{ objectFit: "cover" }} />
      <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(8,27,29,.26) 0%, rgba(8,27,29,.05) 48%, rgba(8,27,29,.18) 100%)" }} />
    </Box>
  );
}
