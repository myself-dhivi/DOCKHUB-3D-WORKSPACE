"use client";

import { Box, Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { Armchair, ArrowRight, CalendarDays, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FALLBACK_ROOM_IMAGE } from "@/lib/constants";
import { formatCurrency, formatDate, formatLabel, getBestPrice } from "@/lib/formatters";
import type { SpaceView } from "@/types/room";
import { RoomStatusBadge } from "@/components/showcase/RoomStatusBadge";

export function SpaceCard({ space }: { space: SpaceView }) {
  const price = getBestPrice(space.pricing);
  const currency = space.pricing[0]?.currency ?? "INR";

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Box sx={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
        <Image src={space.thumbnailImageUrl ?? FALLBACK_ROOM_IMAGE} alt={`${space.name} interior`} fill sizes="(max-width: 700px) 100vw, 33vw" style={{ objectFit: "cover" }} />
        <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(9,31,33,.45), transparent 55%)" }} />
        <Box sx={{ position: "absolute", top: 14, left: 14 }}><RoomStatusBadge status={space.status} /></Box>
        <Chip label={formatLabel(space.roomType)} size="small" sx={{ position: "absolute", bottom: 14, left: 14, bgcolor: "rgba(255,255,255,.9)" }} />
      </Box>
      <CardContent sx={{ p: 2.5, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Typography variant="h5">{space.name}</Typography>
        <Stack direction="row" spacing={.75} sx={{ alignItems: "center", color: "text.secondary", mt: 1 }}>
          <MapPin size={15} /><Typography variant="body2">{space.locationName ?? "Location to be confirmed"}</Typography>
        </Stack>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, my: 2.25 }}>
          <Stack direction="row" spacing={.75} sx={{ alignItems: "center" }}><Users size={16} /><Typography variant="body2">{space.capacity || "TBC"} capacity</Typography></Stack>
          <Stack direction="row" spacing={.75} sx={{ alignItems: "center" }}><Armchair size={16} /><Typography variant="body2">{space.availableSeats || "TBC"} available</Typography></Stack>
          <Stack direction="row" spacing={.75} sx={{ alignItems: "center", gridColumn: "1 / -1" }}><CalendarDays size={16} /><Typography variant="body2">Available {formatDate(space.availableFrom)}</Typography></Stack>
        </Box>
        <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: "#f2f6f4", mb: 2.25 }}>
          <Typography variant="caption" color="text.secondary">{price == null ? "Pricing status" : "Starting from"}</Typography>
          <Typography sx={{ fontWeight: 740, color: "primary.dark" }}>{formatCurrency(price, currency)}{price != null ? " per seat" : ""}</Typography>
          {space.pricing[0]?.preBookingPrice != null && <Typography variant="caption" color="text.secondary">Pre-booking price available</Typography>}
        </Box>
        <Stack direction="row" spacing={1} sx={{ mt: "auto" }}>
          <Button component={Link} href={`/spaces/${space.slug}`} variant="outlined" fullWidth>View Details</Button>
          <Button component={Link} href={`/showcase?space=${space.slug}`} variant="contained" fullWidth endIcon={<ArrowRight size={16} />}>Showcase</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
