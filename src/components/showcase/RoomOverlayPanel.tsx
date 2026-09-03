"use client";

import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";

import { formatLabel } from "@/lib/formatters";
import type { SpaceView } from "@/types/room";
import { AmenitiesList } from "./AmenitiesList";
import { PricingHighlights } from "./PricingHighlights";
import { RoomSpecs } from "./RoomSpecs";
import { RoomStatusBadge } from "./RoomStatusBadge";
import { RoomTimeline } from "./RoomTimeline";

export function RoomOverlayPanel({ room }: { room: SpaceView }) {
  return (
    <Paper elevation={0} sx={{ position: "relative", width: { xs: "100%", md: 430 }, p: { xs: 2.5, sm: 3 }, border: "1px solid rgba(255,255,255,.72)", boxShadow: "0 24px 72px rgba(5,25,27,.22)", bgcolor: "rgba(255,255,255,.95)", backdropFilter: "blur(18px)" }}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 750, letterSpacing: ".11em" }}>{formatLabel(room.roomType)}</Typography>
        <RoomStatusBadge status={room.status} />
      </Stack>
      <Typography component="h1" variant="h3" sx={{ fontSize: { xs: 30, md: 36 }, mt: 1 }}>{room.name}</Typography>
      <Stack direction="row" spacing={.75} sx={{ alignItems: "center", color: "text.secondary", mt: 1.25 }}>
        <MapPin size={16} aria-hidden="true" /><Typography variant="body2">{room.locationName ?? "Location to be confirmed"}</Typography>
      </Stack>
      <Typography color="text.secondary" sx={{ lineHeight: 1.65, mt: 2 }}>{room.description}</Typography>
      <Stack spacing={1.5} sx={{ mt: 2.5 }}>
        <RoomSpecs capacity={room.capacity} availableSeats={room.availableSeats} />
        <PricingHighlights pricing={room.pricing} />
        <RoomTimeline availableFrom={room.availableFrom} availability={room.availability} />
      </Stack>
      <Divider sx={{ my: 2.25 }} />
      <AmenitiesList amenities={room.amenities} compact />
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.25, mt: 2.5 }}>
        <Button component={Link} href={`/spaces/${room.slug}`} variant="outlined" endIcon={<ArrowUpRight size={16} />}>View Details</Button>
        <Button variant="contained" disabled>{room.isPreBookingEnabled ? "Pre-book" : "Book"}</Button>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "right", mt: 1 }}>Booking opens in a later phase.</Typography>
    </Paper>
  );
}
