import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About Us & Affiliate Disclosure | Marya Bet",
  description: "Learn about Marya Bet, our commitment to transparency, and responsible gaming.",
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <div className="home-wrapper">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
