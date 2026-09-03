"use client";

import { Button } from "@mui/material";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function LinkButton({
  href,
  label,
  fullWidth = false,
}: {
  href: string;
  label: string;
  fullWidth?: boolean;
}) {
  return (
    <Button
      component={Link}
      href={href}
      variant="contained"
      fullWidth={fullWidth}
      endIcon={<ArrowRight size={17} />}
    >
      {label}
    </Button>
  );
}
