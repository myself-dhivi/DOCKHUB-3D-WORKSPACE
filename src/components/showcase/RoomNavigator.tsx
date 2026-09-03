"use client";

import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function RoomNavigator({ current, total, onPrevious, onNext }: { current: number; total: number; onPrevious: () => void; onNext: () => void }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center", px: 1, py: .75, borderRadius: 99, color: "white", bgcolor: "rgba(8,27,29,.64)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,.22)" }}>
      <IconButton onClick={onPrevious} aria-label="Previous room" sx={{ color: "white" }}><ArrowLeft size={19} /></IconButton>
      <Box sx={{ minWidth: 78, textAlign: "center" }}><Typography variant="caption" sx={{ color: "rgba(255,255,255,.7)" }}>ROOM</Typography><Typography sx={{ fontWeight: 720 }}>{current} / {total}</Typography></Box>
      <IconButton onClick={onNext} aria-label="Next room" sx={{ color: "white" }}><ArrowRight size={19} /></IconButton>
    </Stack>
  );
}
