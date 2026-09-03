import { Box, Container, Typography } from "@mui/material";

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <Box sx={{ bgcolor: "white", borderBottom: "1px solid", borderColor: "divider", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl">
        {eyebrow && <Typography variant="overline" color="primary" sx={{ fontWeight: 750, letterSpacing: ".12em" }}>{eyebrow}</Typography>}
        <Typography component="h1" variant="h2" sx={{ maxWidth: 800, fontSize: { xs: 38, md: 58 }, mt: .75 }}>{title}</Typography>
        {description && <Typography color="text.secondary" sx={{ maxWidth: 700, fontSize: { xs: 17, md: 19 }, lineHeight: 1.7, mt: 2 }}>{description}</Typography>}
      </Container>
    </Box>
  );
}
