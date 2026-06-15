import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProfitPilot",
  description: "AI-assisted eBay arbitrage operations console",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
