import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import Link from "next/link";

import { PUBLIC_NAVIGATION } from "@/lib/constants";

export function AppFooter() {
  return (
    <Box component="footer" sx={{ bgcolor: "#102a2e", color: "white", mt: { xs: 8, md: 12 }, py: { xs: 6, md: 7 } }}>
      <Container maxWidth="xl">
        <Stack direction={{ xs: "column", md: "row" }} sx={{ justifyContent: "space-between", gap: 5 }}>
          <Box sx={{ maxWidth: 420 }}>
            <Typography sx={{ fontWeight: 780, letterSpacing: ".11em", fontSize: 19, mb: 1.5 }}>DOCKHUB</Typography>
            <Typography sx={{ color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>Flexible workspaces presented clearly, so teams can compare before they book.</Typography>
          </Box>
          <Stack direction={{ xs: "column", sm: "row" }} sx={{ gap: { xs: 4, sm: 8 } }}>
            <Box>
              <Typography variant="overline" sx={{ color: "rgba(255,255,255,.55)" }}>Quick links</Typography>
              <Stack spacing={1.25} sx={{ mt: 1 }}>
                {PUBLIC_NAVIGATION.slice(1).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
              </Stack>
            </Box>
            <Box>
              <Typography variant="overline" sx={{ color: "rgba(255,255,255,.55)" }}>Contact</Typography>
              <Typography sx={{ mt: 1 }}>Location to be confirmed</Typography>
              <Typography sx={{ color: "rgba(255,255,255,.7)", mt: .75 }}>Workspace enquiries coming soon</Typography>
            </Box>
          </Stack>
        </Stack>
        <Divider sx={{ borderColor: "rgba(255,255,255,.14)", my: 4 }} />
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,.55)" }}>© {new Date().getFullYear()} Dockhub. All rights reserved.</Typography>
      </Container>
    </Box>
  );
}
