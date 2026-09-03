"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { ArrowRight, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <Box sx={{ bgcolor: "white", py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        <Box sx={{ position: "relative", minHeight: { xs: 620, md: 670 }, overflow: "hidden", borderRadius: { xs: 3, md: 4 }, display: "flex", alignItems: "flex-end" }}>
          <Image src="/images/rooms/reception-placeholder.jpg" alt="Premium Dockhub reception interior" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
          <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(8,29,31,.88) 0%, rgba(8,29,31,.58) 42%, rgba(8,29,31,.08) 78%)" }} />
          <Box sx={{ position: "relative", color: "white", maxWidth: 710, p: { xs: 3, sm: 5, md: 7 } }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}><Building2 size={18} /><Typography variant="overline" sx={{ fontWeight: 750, letterSpacing: ".13em" }}>Workspace discovery, simplified</Typography></Stack>
            <Typography component="h1" variant="h1" sx={{ fontSize: { xs: 45, sm: 58, md: 72 } }}>Explore Dockhub Workspaces</Typography>
            <Typography sx={{ fontSize: { xs: 17, md: 20 }, lineHeight: 1.7, color: "rgba(255,255,255,.82)", mt: 2.5 }}>Browse conference rooms, cabins, and flexible workspaces room by room. Compare pricing, capacity, and availability before you book.</Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 4 }}>
              <Button component={Link} href="/showcase" variant="contained" color="secondary" endIcon={<ArrowRight size={17} />}>Start Room Tour</Button>
              <Button component={Link} href="/spaces" variant="outlined" sx={{ color: "white", borderColor: "rgba(255,255,255,.65)", "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,.08)" } }}>View All Spaces</Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
