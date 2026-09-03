"use client";

import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { Menu } from "lucide-react";
import { useState } from "react";

import { AdminSidebar } from "./AdminSidebar";

const drawerWidth = 264;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7f5" }}>
      <Drawer variant="permanent" sx={{ display: { xs: "none", md: "block" }, width: drawerWidth, "& .MuiDrawer-paper": { width: drawerWidth, border: 0 } }}><AdminSidebar /></Drawer>
      <Drawer variant="temporary" open={open} onClose={() => setOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth, border: 0 } }}><AdminSidebar onNavigate={() => setOpen(false)} /></Drawer>
      <Box sx={{ ml: { md: `${drawerWidth}px` } }}>
        <Stack component="header" direction="row" spacing={2} sx={{ alignItems: "center", height: 68, px: { xs: 2, md: 4 }, borderBottom: "1px solid", borderColor: "divider", bgcolor: "white" }}>
          <IconButton aria-label="Open admin navigation" onClick={() => setOpen(true)} sx={{ display: { md: "none" } }}><Menu size={24} /></IconButton>
          <Typography sx={{ fontWeight: 700 }}>Workspace administration</Typography>
          <Typography variant="caption" sx={{ ml: "auto !important", color: "text.secondary", border: "1px solid", borderColor: "divider", borderRadius: 99, px: 1.25, py: .5 }}>Read-only foundation</Typography>
        </Stack>
        <Box component="main" sx={{ p: { xs: 2, sm: 3, lg: 4 } }}>{children}</Box>
      </Box>
    </Box>
  );
}
