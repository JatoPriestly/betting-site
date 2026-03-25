import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Marya Bet",
  description: "Answers to the most common questions about sports betting, promo codes, and payouts.",
};

export default function FAQLayout({ children }: { children: ReactNode }) {
  return (
    <div className="home-wrapper">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
