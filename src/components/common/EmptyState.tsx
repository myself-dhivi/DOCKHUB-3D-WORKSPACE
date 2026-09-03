"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import { Inbox } from "lucide-react";
import Link from "next/link";

export function EmptyState({ title, description, actionLabel, actionHref }: { title: string; description: string; actionLabel?: string; actionHref?: string }) {
  return (
    <Paper variant="outlined" sx={{ py: 7, px: 3, textAlign: "center", boxShadow: "none" }}>
      <Box sx={{ width: 48, height: 48, borderRadius: 3, bgcolor: "#e5efeb", color: "primary.main", display: "grid", placeItems: "center", mx: "auto", mb: 2 }}>
        <Inbox size={23} aria-hidden="true" />
      </Box>
      <Typography variant="h5">{title}</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 540, mx: "auto", mt: 1, lineHeight: 1.7 }}>{description}</Typography>
      {actionLabel && actionHref && <Button component={Link} href={actionHref} variant="outlined" sx={{ mt: 3 }}>{actionLabel}</Button>}
    </Paper>
  );
}
