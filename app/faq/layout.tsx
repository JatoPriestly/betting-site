import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getDictionary } from "../dictionaries";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Marya Bet",
  description: "Answers to the most common questions about sports betting, promo codes, and payouts.",
};

export default async function FAQLayout({ children }: { children: ReactNode }) {
  const dict = await getDictionary('en');
  
  return (
    <div className="home-wrapper">
      <Navbar dict={dict} lang="en" />
      {children}
      <Footer />
    </div>
  );
}

