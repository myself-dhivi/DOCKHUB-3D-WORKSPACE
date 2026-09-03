import { Box, Container } from "@mui/material";
import type { Metadata } from "next";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { SpaceCard } from "@/components/spaces/SpaceCard";
import { getAllSpaces } from "@/services/rooms.service";

export const metadata: Metadata = { title: "Spaces" };
export const dynamic = "force-dynamic";

export default async function SpacesPage() {
  const spaces = await getAllSpaces();
  return (
    <>
      <PageHeader eyebrow="Dockhub inventory" title="Find a space that works" description="Compare every showcase room and workspace using one consistent view of capacity, availability, and approved pricing." />
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        {spaces.length ? <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>{spaces.map((space) => <SpaceCard key={space.id} space={space} />)}</Box> : <EmptyState title="No spaces available" description="Run the database seed to load the initial showcase spaces." />}
      </Container>
    </>
  );
}
