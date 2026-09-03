import { Box } from "@mui/material";

import { EmptyState } from "@/components/common/EmptyState";
import { SpaceCard } from "@/components/spaces/SpaceCard";
import type { SpaceView } from "@/types/room";

export function FeaturedSpaces({ spaces }: { spaces: SpaceView[] }) {
  if (!spaces.length) return <EmptyState title="Featured spaces are being prepared" description="Confirmed available and pre-booking spaces will appear here." actionLabel="Browse the showcase" actionHref="/showcase" />;

  return <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>{spaces.map((space) => <SpaceCard key={space.id} space={space} />)}</Box>;
}
