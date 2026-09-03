import { Box, Button, Container, Divider, Paper, Stack, Typography } from "@mui/material";
import { Users } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LinkButton } from "@/components/common/LinkButton";
import { SectionTitle } from "@/components/common/SectionTitle";
import { RoomTimeline } from "@/components/showcase/RoomTimeline";
import { SpaceAmenitiesSection } from "@/components/spaces/SpaceAmenitiesSection";
import { SpaceDetailsHeader } from "@/components/spaces/SpaceDetailsHeader";
import { SpacePricingSection } from "@/components/spaces/SpacePricingSection";
import { getSpaceBySlug } from "@/services/rooms.service";

export const dynamic = "force-dynamic";

type SpacePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: SpacePageProps): Promise<Metadata> {
  const { slug } = await params;
  const space = await getSpaceBySlug(slug);
  return { title: space?.name ?? "Space not found", description: space?.description };
}

export default async function SpaceDetailsPage({ params }: SpacePageProps) {
  const { slug } = await params;
  const space = await getSpaceBySlug(slug);
  if (!space) notFound();

  return (
    <>
      <SpaceDetailsHeader space={space} />
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.5fr) minmax(300px, .75fr)" }, gap: { xs: 4, md: 6 } }}>
          <Stack spacing={6}>
            <section><SectionTitle eyebrow="Overview" title="About this space" /><Typography color="text.secondary" sx={{ fontSize: 17, lineHeight: 1.8 }}>{space.description}</Typography></section>
            <section><SectionTitle eyebrow="Commercials" title="Pricing" /><SpacePricingSection pricing={space.pricing} /></section>
            <section><SectionTitle eyebrow="Included" title="Amenities" /><SpaceAmenitiesSection amenities={space.amenities} /></section>
          </Stack>
          <Paper component="aside" variant="outlined" sx={{ p: 3, alignSelf: "start", position: { md: "sticky" }, top: { md: 100 }, boxShadow: "none" }}>
            <Typography variant="h5">Space details</Typography>
            <Stack spacing={2.25} sx={{ mt: 2.5 }}>
              <Stack direction="row" spacing={1.25}><Users size={19} /><Box><Typography variant="caption" color="text.secondary">Capacity / available seats</Typography><Typography sx={{ fontWeight: 680 }}>{space.capacity || "TBC"} / {space.availableSeats || "TBC"}</Typography></Box></Stack>
              <RoomTimeline availableFrom={space.availableFrom} availability={space.availability} />
            </Stack>
            <Divider sx={{ my: 3 }} />
            <LinkButton href={`/showcase?space=${space.slug}`} label="Open in Showcase" fullWidth />
            <Button disabled variant="outlined" fullWidth sx={{ mt: 1.25 }}>{space.isPreBookingEnabled ? "Pre-book" : "Book"}</Button>
            <Typography id="booking-status" variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "center", mt: 1.25 }}>Booking is intentionally deferred to a later phase.</Typography>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
