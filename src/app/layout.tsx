import type { Metadata, Viewport } from "next";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Providers } from "./providers";
import "./globals.css";
import { HeaderGate } from "@/components/layout/header-gate";

export const metadata: Metadata = {
  title: {
    default: "CamboDecor — Construction Material Store",
    template: "%s | CamboDecor",
  },
  description:
    "CamboDecor 2.0 — home and construction materials, furniture, tools, and services across Cambodia.",
};

export const viewport: Viewport = {
  themeColor: "#1B2A4A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <HeaderGate />
          {/* pb-20 clears the fixed tab bar; from md: the bar is gone */}
          <main className="container pb-20 pt-4 md:pb-10 md:pt-6">{children}</main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
