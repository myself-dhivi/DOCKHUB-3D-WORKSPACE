"use client";

import { usePathname } from "next/navigation";

import { AppFooter } from "@/components/layout/AppFooter";
import { AppHeader } from "@/components/layout/AppHeader";

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return children;

  return <><AppHeader /><main>{children}</main><AppFooter /></>;
}
