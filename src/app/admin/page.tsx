import { Box, Paper, Stack, Typography } from "@mui/material";
import { BadgeIndianRupee, DoorOpen, Ticket, TimerReset } from "lucide-react";

import { getAdminSummary } from "@/services/summary.service";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const summary = await getAdminSummary();
  const cards = [
    { label: "Total rooms", value: summary.totalRooms, icon: DoorOpen },
    { label: "Priced spaces", value: summary.pricedSpaces, icon: BadgeIndianRupee },
    { label: "Pre-booking spaces", value: summary.preBookingSpaces, icon: TimerReset },
    { label: "Active pass plans", value: summary.activePassPlans, icon: Ticket },
  ];
  return (
    <>
      <Typography component="h1" variant="h4">Dashboard</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>A read-only operational view for this foundation phase.</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", xl: "repeat(4, 1fr)" }, gap: 2.5, mt: 4 }}>
        {cards.map(({ label, value, icon: Icon }) => <Paper key={label} variant="outlined" sx={{ p: 3, boxShadow: "none" }}><Stack direction="row" sx={{ justifyContent: "space-between" }}><Box><Typography color="text.secondary" variant="body2">{label}</Typography><Typography variant="h4" sx={{ mt: 1 }}>{value}</Typography></Box><Box sx={{ color: "primary.main" }}><Icon size={23} /></Box></Stack></Paper>)}
      </Box>
    </>
  );
}
