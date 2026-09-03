"use client";

import { AppBar, Box, Button, Container, Drawer, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { ArrowUpRight, Building2, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { PUBLIC_NAVIGATION, SITE_NAME } from "@/lib/constants";

export function AppHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AppBar color="inherit" elevation={0} position="sticky" sx={{ borderBottom: "1px solid", borderColor: "divider", bgcolor: "rgba(255,255,255,.94)", backdropFilter: "blur(16px)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 68, md: 76 } }}>
          <Stack component={Link} href="/" direction="row" spacing={1.25} aria-label="Dockhub home" sx={{ alignItems: "center" }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 2.5, bgcolor: "primary.main", color: "primary.contrastText", display: "grid", placeItems: "center" }}>
              <Building2 size={20} strokeWidth={2.2} aria-hidden="true" />
            </Box>
            <Typography sx={{ fontWeight: 780, letterSpacing: ".11em", fontSize: 18 }}>{SITE_NAME}</Typography>
          </Stack>

          <Stack component="nav" direction="row" spacing={0.5} sx={{ ml: 7, display: { xs: "none", md: "flex" } }} aria-label="Primary navigation">
            {PUBLIC_NAVIGATION.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return <Button key={item.href} component={Link} href={item.href} color={active ? "primary" : "inherit"} sx={{ px: 1.5 }}>{item.label}</Button>;
            })}
          </Stack>

          <Button component={Link} href="/spaces" variant="contained" endIcon={<ArrowUpRight size={17} />} sx={{ ml: "auto", display: { xs: "none", sm: "inline-flex" } }}>
            Book Workspace
          </Button>
          <IconButton aria-label="Open navigation" onClick={() => setMobileOpen(true)} sx={{ ml: "auto", display: { md: "none" } }}>
            <Menu size={24} />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Stack sx={{ width: 290, p: 3 }} spacing={1}>
          <Typography sx={{ fontWeight: 760, mb: 2 }}>DOCKHUB</Typography>
          {PUBLIC_NAVIGATION.map((item) => (
            <Button key={item.href} component={Link} href={item.href} onClick={() => setMobileOpen(false)} sx={{ justifyContent: "flex-start" }}>{item.label}</Button>
          ))}
          <Button component={Link} href="/spaces" variant="contained" onClick={() => setMobileOpen(false)} sx={{ mt: 2 }}>Book Workspace</Button>
        </Stack>
      </Drawer>
    </AppBar>
  );
}
