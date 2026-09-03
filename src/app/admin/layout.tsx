import type { Metadata } from "next";

import { AdminShell } from "@/components/layout/AdminShell";

export const metadata: Metadata = { title: { default: "Admin", template: "%s | Dockhub Admin" } };

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <AdminShell>{children}</AdminShell>;
}
