import { Chip } from "@mui/material";
import type { LucideIcon } from "lucide-react";

export function InfoChip({ label, icon: Icon }: { label: string; icon?: LucideIcon }) {
  return <Chip icon={Icon ? <Icon size={15} /> : undefined} label={label} variant="outlined" sx={{ bgcolor: "rgba(255,255,255,.86)" }} />;
}
