import type { Metadata } from "next";

import { AppThemeProvider } from "@/components/layout/AppThemeProvider";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "DOCKHUB",
  description: "DockHub spatial workspace installation — an unattended, motion-led expo experience.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
