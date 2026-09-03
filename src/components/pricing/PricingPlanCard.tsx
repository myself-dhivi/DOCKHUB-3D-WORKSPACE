"use client";

import { Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { ArrowRight, CalendarRange } from "lucide-react";
import Link from "next/link";

import { formatCurrency, formatDate, formatLabel } from "@/lib/formatters";
import type { RoomPricingView } from "@/types/pricing";

export function PricingPlanCard({ pricing }: { pricing: RoomPricingView }) {
  const preferred = pricing.preBookingPrice ?? pricing.offerPrice;
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 750 }}>{formatLabel(pricing.period)} · per seat</Typography>
        <Typography variant="h5" sx={{ mt: .5 }}>{pricing.roomName}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: .75 }}>{pricing.planName}</Typography>
        <Divider sx={{ my: 2.5 }} />
        <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}>
          <div><Typography variant="caption" color="text.secondary">Regular price</Typography><Typography sx={{ fontWeight: 700 }}>{formatCurrency(pricing.regularPrice, pricing.currency)}</Typography></div>
          <div><Typography variant="caption" color="text.secondary">Pre-booking / offer</Typography><Typography variant="h6" color="primary.dark">{formatCurrency(preferred, pricing.currency)}</Typography></div>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2.5, color: "text.secondary" }}><CalendarRange size={16} /><Typography variant="body2">{formatDate(pricing.effectiveFrom)} — {pricing.effectiveUntil ? formatDate(pricing.effectiveUntil) : "Open-ended"}</Typography></Stack>
        {pricing.planDescription && <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.6 }}>{pricing.planDescription}</Typography>}
        <Button component={Link} href={`/spaces/${pricing.roomSlug}`} endIcon={<ArrowRight size={16} />} sx={{ px: 0, mt: 2.5 }}>View space</Button>
      </CardContent>
    </Card>
  );
}
