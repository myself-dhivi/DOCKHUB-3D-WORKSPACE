import { Stack, Typography } from "@mui/material";
import { CalendarDays } from "lucide-react";

import { formatDate } from "@/lib/formatters";
import type { AvailabilityView } from "@/types/room";

export function RoomTimeline({ availableFrom, availability }: { availableFrom: string | null; availability: AvailabilityView[] }) {
  const note = availability[0]?.note;
  return (
    <Stack direction="row" spacing={1.25} sx={{ alignItems: "flex-start" }}>
      <CalendarDays size={18} aria-hidden="true" />
      <div><Typography variant="caption" color="text.secondary">Availability timeline</Typography><Typography variant="body2" sx={{ fontWeight: 620 }}>{note ?? formatDate(availableFrom)}</Typography></div>
    </Stack>
  );
}
