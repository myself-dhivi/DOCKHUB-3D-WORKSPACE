import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import type { Metadata } from "next";

import { EmptyState } from "@/components/common/EmptyState";
import { formatCurrency, formatLabel } from "@/lib/formatters";
import { getPassPlans } from "@/services/passes.service";

export const metadata: Metadata = { title: "Pass Plans" };
export const dynamic = "force-dynamic";

export default async function AdminPassesPage() {
  const passes = await getPassPlans(true);
  return (
    <>
      <Typography component="h1" variant="h4">Pass Plans</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>Read-only pass-plan inventory, including future inactive drafts.</Typography>
      {passes.length ? <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: "none" }}><Table><TableHead><TableRow><TableCell>Plan</TableCell><TableCell>Duration</TableCell><TableCell>Price</TableCell><TableCell>Status</TableCell><TableCell>Notes</TableCell></TableRow></TableHead><TableBody>{passes.map((plan) => <TableRow key={plan.id}><TableCell>{plan.name}</TableCell><TableCell>{plan.duration && plan.durationUnit ? `${plan.duration} ${formatLabel(plan.durationUnit)}` : "TBC"}</TableCell><TableCell>{formatCurrency(plan.price, plan.currency)}</TableCell><TableCell><Chip size="small" label={plan.isActive ? "Active" : "Draft"} /></TableCell><TableCell>{plan.notes ?? "—"}</TableCell></TableRow>)}</TableBody></Table></TableContainer> : <EmptyState title="No pass plans recorded" description="The handwritten 6/12/15 and 100/200/200 values remain unseeded because their units and commercial meaning are not confirmed." />}
    </>
  );
}
