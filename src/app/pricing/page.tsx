import { Box, Container } from "@mui/material";
import type { Metadata } from "next";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { PricingPlanCard } from "@/components/pricing/PricingPlanCard";
import { getAllRoomPricing } from "@/services/pricing.service";

export const metadata: Metadata = { title: "Pricing" };
export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const pricing = await getAllRoomPricing();
  return (
    <>
      <PageHeader eyebrow="Transparent workspace pricing" title="Compare approved room pricing" description="Review regular and pre-booking prices by space. Supporting showcase rooms remain contact-only until their commercial details are confirmed." />
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        {pricing.length ? <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))", lg: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>{pricing.map((record) => <PricingPlanCard key={record.id} pricing={record} />)}</Box> : <EmptyState title="Pricing is being prepared" description="There are no active room pricing records yet." actionLabel="Browse spaces" actionHref="/spaces" />}
      </Container>
    </>
  );
}
