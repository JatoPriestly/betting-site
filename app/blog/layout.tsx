import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Marya Betting Blog",
    default: "Marya Betting Blog",
  },
  description:
    "Expert sports betting strategies, tips, and guides to help you bet smarter and win more.",
  openGraph: {
    siteName: "Marya Betting Blog",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="home-wrapper">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
