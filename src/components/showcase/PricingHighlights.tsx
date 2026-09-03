import { Box, Stack, Typography } from "@mui/material";

import { formatCurrency, formatLabel } from "@/lib/formatters";
import type { RoomPricingView } from "@/types/pricing";

export function PricingHighlights({ pricing }: { pricing: RoomPricingView[] }) {
  const primary = pricing[0];
  if (!primary) {
    return <Box sx={{ p: 1.75, borderRadius: 2.5, bgcolor: "#f4f7f5" }}><Typography variant="caption" color="text.secondary">Pricing</Typography><Typography sx={{ fontWeight: 720 }}>Contact for pricing</Typography></Box>;
  }

  const preferred = primary.preBookingPrice ?? primary.offerPrice;
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-end", p: 1.75, borderRadius: 2.5, bgcolor: "#edf5f2" }}>
      <Box>
        <Typography variant="caption" color="text.secondary">{preferred != null ? "Pre-booking price" : "Regular price"}</Typography>
        <Typography variant="h5" color="primary.dark">{formatCurrency(preferred ?? primary.regularPrice, primary.currency)}</Typography>
      </Box>
      <Box sx={{ textAlign: "right" }}>
        {preferred != null && <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>{formatCurrency(primary.regularPrice, primary.currency)}</Typography>}
        <Typography variant="caption" color="text.secondary">{formatLabel(primary.period)} · per seat</Typography>
      </Box>
    </Stack>
  );
}
