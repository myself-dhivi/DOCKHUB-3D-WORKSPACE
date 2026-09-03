import { Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@mui/material";
import type { Metadata } from "next";

import { formatCurrency, formatLabel } from "@/lib/formatters";
import { getAllRoomPricing } from "@/services/pricing.service";

export const metadata: Metadata = { title: "Pricing" };
export const dynamic = "force-dynamic";

export default async function AdminPricingPage() {
  const pricing = await getAllRoomPricing(true);
  return (
    <>
      <Typography component="h1" variant="h4">Pricing</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>Read-only pricing records. Commercial updates arrive with CRUD in a later phase.</Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ boxShadow: "none" }}>
        <Table><TableHead><TableRow><TableCell>Space</TableCell><TableCell>Plan</TableCell><TableCell>Regular</TableCell><TableCell>Pre-booking / offer</TableCell><TableCell>Status</TableCell></TableRow></TableHead>
          <TableBody>{pricing.map((record) => <TableRow key={record.id} hover><TableCell>{record.roomName}</TableCell><TableCell><Typography sx={{ fontWeight: 650 }}>{record.planName}</Typography><Typography variant="caption" color="text.secondary">{formatLabel(record.period)}</Typography></TableCell><TableCell>{formatCurrency(record.regularPrice, record.currency)}</TableCell><TableCell>{formatCurrency(record.preBookingPrice ?? record.offerPrice, record.currency)}</TableCell><TableCell><Chip size="small" label={record.isActive ? "Active" : "Inactive"} color={record.isActive ? "success" : "default"} /></TableCell></TableRow>)}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
