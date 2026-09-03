import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import { CalendarDays } from "lucide-react";

import { formatCurrency, formatDate, formatLabel } from "@/lib/formatters";
import type { PassPlanView } from "@/types/pass";

export function PassPlanCard({ plan }: { plan: PassPlanView }) {
  return (
    <Card sx={{ height: "100%" }}><CardContent sx={{ p: 3 }}>
      <Stack direction="row" sx={{ justifyContent: "space-between", gap: 2 }}><Typography variant="h5">{plan.name}</Typography><Chip size="small" label={plan.isActive ? "Active" : "Draft"} color={plan.isActive ? "success" : "default"} /></Stack>
      <Typography color="text.secondary" sx={{ mt: 1.25, lineHeight: 1.65 }}>{plan.description}</Typography>
      <Typography variant="h4" color="primary.dark" sx={{ mt: 3 }}>{formatCurrency(plan.price, plan.currency)}</Typography>
      <Typography variant="body2" color="text.secondary">{plan.duration && plan.durationUnit ? `${plan.duration} ${formatLabel(plan.durationUnit)}` : "Duration to be confirmed"}</Typography>
      <Stack direction="row" spacing={1} sx={{ mt: 2.5, color: "text.secondary" }}><CalendarDays size={16} /><Typography variant="body2">{formatDate(plan.validFrom)} — {formatDate(plan.validUntil)}</Typography></Stack>
      {plan.notes && <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>{plan.notes}</Typography>}
    </CardContent></Card>
  );
}
