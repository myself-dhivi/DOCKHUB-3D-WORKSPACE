import { Box, Paper, Stack, Typography } from "@mui/material";

import { formatCurrency, formatDate, formatLabel } from "@/lib/formatters";
import type { RoomPricingView } from "@/types/pricing";
import { EmptyState } from "@/components/common/EmptyState";

export function SpacePricingSection({ pricing }: { pricing: RoomPricingView[] }) {
  if (!pricing.length) return <EmptyState title="Pricing to be confirmed" description="Commercial pricing has not been approved for this showcase space. Contact the Dockhub team when enquiries open." />;

  return <Stack spacing={2}>{pricing.map((record) => (
    <Paper key={record.id} variant="outlined" sx={{ p: 2.5, boxShadow: "none" }}>
      <Stack direction={{ xs: "column", sm: "row" }} sx={{ justifyContent: "space-between", gap: 2 }}>
        <Box><Typography variant="h6">{record.planName}</Typography><Typography variant="body2" color="text.secondary">{formatLabel(record.period)} · per seat</Typography></Box>
        <Box sx={{ textAlign: { sm: "right" } }}><Typography variant="caption" color="text.secondary">Regular</Typography><Typography sx={{ fontWeight: 700 }}>{formatCurrency(record.regularPrice, record.currency)}</Typography></Box>
        <Box sx={{ textAlign: { sm: "right" } }}><Typography variant="caption" color="text.secondary">Pre-booking / offer</Typography><Typography variant="h6" color="primary.dark">{formatCurrency(record.preBookingPrice ?? record.offerPrice, record.currency)}</Typography></Box>
      </Stack>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>Effective {formatDate(record.effectiveFrom)} — {record.effectiveUntil ? formatDate(record.effectiveUntil) : "no confirmed end date"}</Typography>
    </Paper>
  ))}</Stack>;
}
