import { Container } from "@mui/material";

import { LoadingState } from "@/components/common/LoadingState";

export default function Loading() {
  return <Container maxWidth="xl" sx={{ py: 8 }}><LoadingState /></Container>;
}
