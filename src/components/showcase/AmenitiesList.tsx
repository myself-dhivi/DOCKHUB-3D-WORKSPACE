import { Chip, Stack, Typography } from "@mui/material";
import { Check } from "lucide-react";

export function AmenitiesList({ amenities, compact = false }: { amenities: string[]; compact?: boolean }) {
  if (!amenities.length) return <Typography variant="body2" color="text.secondary">Amenities pending confirmation</Typography>;
  return <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>{amenities.slice(0, compact ? 4 : undefined).map((amenity) => <Chip key={amenity} icon={<Check size={14} />} label={amenity} size="small" variant="outlined" />)}</Stack>;
}
