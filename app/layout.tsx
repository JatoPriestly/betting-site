import type { Metadata } from "next";
import { Inter } from "next/font/google";
import WhatsAppWidget from "./components/WhatsAppWidget";
import SystemAdManager from "./components/SystemAdManager";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Marya Bet",
    default: "Marya Bet | Premium Sports Betting",
  },
  description: "Experience the ultimate edge in sports betting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <WhatsAppWidget />
        <SystemAdManager />
      </body>
    </html>
  );
}
