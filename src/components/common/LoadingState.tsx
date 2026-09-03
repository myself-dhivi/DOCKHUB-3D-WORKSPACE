import { Box, Skeleton, Stack } from "@mui/material";

export function LoadingState() {
  return (
    <Box aria-label="Loading content" aria-busy="true">
      <Skeleton variant="rounded" height={280} />
      <Stack spacing={1} sx={{ mt: 2 }}><Skeleton width="55%" /><Skeleton width="82%" /></Stack>
    </Box>
  );
}
