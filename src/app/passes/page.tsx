import { Box, Container } from "@mui/material";
import type { Metadata } from "next";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { PassPlanCard } from "@/components/pricing/PassPlanCard";
import { getPassPlans } from "@/services/passes.service";

export const metadata: Metadata = { title: "Passes" };
export const dynamic = "force-dynamic";

export default async function PassesPage() {
  const passes = await getPassPlans();
  return (
    <>
      <PageHeader eyebrow="Flexible access" title="Dockhub passes" description="Pass plans will appear here after their duration, validity, and pricing are confirmed by the business team." />
      <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
        {passes.length ? <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: 3 }}>{passes.map((plan) => <PassPlanCard key={plan.id} plan={plan} />)}</Box> : <EmptyState title="Pass plans are coming soon" description="The handwritten pass values are not clear enough to publish. No unconfirmed pricing is shown publicly." actionLabel="Explore spaces" actionHref="/spaces" />}
      </Container>
    </>
  );
}
