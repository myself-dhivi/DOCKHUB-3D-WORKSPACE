import { Box, Stack, Typography } from "@mui/material";
import { Armchair, Users } from "lucide-react";

export function RoomSpecs({ capacity, availableSeats }: { capacity: number; availableSeats: number }) {
  const specs = [
    { label: "Capacity", value: capacity > 0 ? capacity.toLocaleString("en-IN") : "TBC", icon: Users },
    { label: "Available seats", value: availableSeats > 0 ? availableSeats.toLocaleString("en-IN") : "TBC", icon: Armchair },
  ];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 1.25 }}>
      {specs.map(({ label, value, icon: Icon }) => (
        <Stack key={label} direction="row" spacing={1.25} sx={{ p: 1.5, borderRadius: 2.5, bgcolor: "#f4f7f5" }}>
          <Box sx={{ color: "primary.main", mt: .25 }}><Icon size={18} aria-hidden="true" /></Box>
          <Box><Typography variant="caption" color="text.secondary">{label}</Typography><Typography sx={{ fontWeight: 720 }}>{value}</Typography></Box>
        </Stack>
      ))}
    </Box>
  );
}
