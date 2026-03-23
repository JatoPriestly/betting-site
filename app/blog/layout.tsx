import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Dice Betting Blog",
    default: "Dice Betting Blog",
  },
  description:
    "Expert sports betting strategies, tips, and guides to help you bet smarter and win more.",
  openGraph: {
    siteName: "Dice Betting Blog",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
