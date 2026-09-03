"use client";

import { Box, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { BadgeIndianRupee, DoorOpen, LayoutDashboard, Ticket, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Rooms", href: "/admin/rooms", icon: DoorOpen },
  { label: "Pricing", href: "/admin/pricing", icon: BadgeIndianRupee },
  { label: "Pass Plans", href: "/admin/passes", icon: Ticket },
] as const;

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <Box sx={{ width: 264, height: "100%", bgcolor: "#102a2e", color: "white", p: 2 }}>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", px: 1.5, py: 2, mb: 2 }}>
        <Box><Typography sx={{ fontWeight: 780, letterSpacing: ".1em" }}>DOCKHUB</Typography><Typography variant="caption" sx={{ color: "rgba(255,255,255,.55)" }}>ADMIN CONSOLE</Typography></Box>
        {onNavigate && <Box component="button" onClick={onNavigate} aria-label="Close navigation" sx={{ display: { md: "none" }, border: 0, bgcolor: "transparent", color: "inherit", cursor: "pointer" }}><X size={20} /></Box>}
      </Stack>
      <List sx={{ display: "grid", gap: .5 }}>
        {items.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return <ListItemButton key={href} component={Link} href={href} selected={active} onClick={onNavigate} sx={{ borderRadius: 2.5, color: "rgba(255,255,255,.72)", "&.Mui-selected": { bgcolor: "rgba(255,255,255,.12)", color: "white" }, "&.Mui-selected:hover": { bgcolor: "rgba(255,255,255,.16)" } }}><ListItemIcon sx={{ minWidth: 38, color: "inherit" }}><Icon size={19} /></ListItemIcon><ListItemText primary={label} /></ListItemButton>;
        })}
      </List>
      <Typography component={Link} href="/" variant="body2" onClick={onNavigate} sx={{ display: "block", color: "rgba(255,255,255,.62)", px: 1.5, mt: 4 }}>← Return to website</Typography>
    </Box>
  );
}
