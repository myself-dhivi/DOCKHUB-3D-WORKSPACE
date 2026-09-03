import { Chip } from "@mui/material";

import { formatLabel } from "@/lib/formatters";
import type { RoomStatus } from "@/types/room";

const statusStyles: Record<RoomStatus, { color: string; backgroundColor: string }> = {
  AVAILABLE: { color: "#17685d", backgroundColor: "#e3f2ed" },
  PRE_BOOKING: { color: "#8a5a13", backgroundColor: "#fff1d9" },
  COMING_SOON: { color: "#485d62", backgroundColor: "#eaf0f1" },
  OCCUPIED: { color: "#8a3b35", backgroundColor: "#fae9e7" },
  INACTIVE: { color: "#5d6668", backgroundColor: "#ecefef" },
};

export function RoomStatusBadge({ status }: { status: RoomStatus }) {
  return <Chip size="small" label={formatLabel(status)} sx={{ ...statusStyles[status], border: 0 }} />;
}
