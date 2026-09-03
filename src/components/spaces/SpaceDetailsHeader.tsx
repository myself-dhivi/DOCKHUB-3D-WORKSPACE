"use client";

import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { ArrowLeft, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FALLBACK_ROOM_IMAGE } from "@/lib/constants";
import { formatLabel } from "@/lib/formatters";
import type { SpaceView } from "@/types/room";
import { RoomStatusBadge } from "@/components/showcase/RoomStatusBadge";

export function SpaceDetailsHeader({ space }: { space: SpaceView }) {
  return (
    <Box sx={{ position: "relative", minHeight: { xs: 520, md: 620 }, color: "white", display: "flex", alignItems: "flex-end" }}>
      <Image src={space.backgroundImageUrl ?? FALLBACK_ROOM_IMAGE} alt={`${space.name} interior`} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(7,26,28,.82) 0%, rgba(7,26,28,.25) 62%, rgba(7,26,28,.08) 100%)" }} />
      <Container maxWidth="xl" sx={{ position: "relative", pb: { xs: 5, md: 7 } }}>
        <Button component={Link} href="/spaces" color="inherit" startIcon={<ArrowLeft size={17} />} sx={{ mb: 3, bgcolor: "rgba(8,28,30,.28)" }}>All spaces</Button>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}><RoomStatusBadge status={space.status} /><Chip label={formatLabel(space.roomType)} size="small" sx={{ bgcolor: "rgba(255,255,255,.9)" }} /></Stack>
        <Typography component="h1" variant="h2" sx={{ fontSize: { xs: 40, md: 64 }, maxWidth: 820 }}>{space.name}</Typography>
        <Stack direction="row" spacing={.75} sx={{ alignItems: "center", mt: 2, color: "rgba(255,255,255,.82)" }}><MapPin size={18} /><Typography>{space.locationName ?? "Location to be confirmed"}</Typography></Stack>
      </Container>
    </Box>
  );
}
