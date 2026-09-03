import { Box, Paper, Stack, Typography } from "@mui/material";
import { Armchair, Building, IndianRupee, MapPin, TimerReset } from "lucide-react";

import { formatCurrency } from "@/lib/formatters";
import type { WorkspaceSummaryView } from "@/types/room";

export function WorkspaceSummary({ summary }: { summary: WorkspaceSummaryView }) {
  const items = [
    { label: "Total Capacity", value: summary.totalCapacity.toLocaleString("en-IN"), icon: Armchair },
    { label: "Available Spaces", value: summary.availableSpaces.toLocaleString("en-IN"), icon: Building },
    { label: "Pre-booking Spaces", value: summary.preBookingSpaces.toLocaleString("en-IN"), icon: TimerReset },
    { label: "Starting Price", value: formatCurrency(summary.startingPrice, summary.startingCurrency), icon: IndianRupee },
    { label: "Locations", value: summary.locations.toLocaleString("en-IN"), icon: MapPin },
  ];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(5, 1fr)" }, gap: 2 }}>
      {items.map(({ label, value, icon: Icon }) => (
        <Paper key={label} variant="outlined" sx={{ p: 2.5, boxShadow: "none" }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", gap: 2 }}>
            <Box><Typography variant="body2" color="text.secondary">{label}</Typography><Typography variant="h5" sx={{ mt: .75 }}>{value}</Typography></Box>
            <Box sx={{ width: 38, height: 38, borderRadius: 2.5, display: "grid", placeItems: "center", bgcolor: "#e5efeb", color: "primary.main" }}><Icon size={19} /></Box>
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}
