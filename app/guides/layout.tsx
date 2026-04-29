import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getDictionary } from "../dictionaries";

export const metadata: Metadata = {
  title: "Betting Guides & Strategies | Marya Bet",
  description: "Master the fundamentals of sports betting. Learn how to read odds, calculate probabilities, and identify value bets.",
};

export default async function GuidesLayout({ children }: { children: ReactNode }) {
  const dict = await getDictionary('en');
  
  return (
    <div className="home-wrapper">
      <Navbar dict={dict} lang="en" />
      {children}
      <Footer />
    </div>
  );
}

