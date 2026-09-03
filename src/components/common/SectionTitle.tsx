import { Box, Typography } from "@mui/material";

export function SectionTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <Box sx={{ mb: { xs: 3, md: 4 } }}>
      {eyebrow && <Typography variant="overline" color="primary" sx={{ fontWeight: 750, letterSpacing: ".12em" }}>{eyebrow}</Typography>}
      <Typography component="h2" variant="h3" sx={{ fontSize: { xs: 30, md: 42 }, mt: .5 }}>{title}</Typography>
      {description && <Typography color="text.secondary" sx={{ maxWidth: 660, lineHeight: 1.7, mt: 1.25 }}>{description}</Typography>}
    </Box>
  );
}
