import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getDictionary } from "../dictionaries";

export const metadata: Metadata = {
  title: "About Us & Affiliate Disclosure | Marya Bet",
  description: "Learn about Marya Bet, our commitment to transparency, and responsible gaming.",
};

export default async function AboutLayout({ children }: { children: ReactNode }) {
  const dict = await getDictionary('en');
  
  return (
    <div className="home-wrapper">
      <Navbar dict={dict} lang="en" />
      {children}
      <Footer />
    </div>
  );
}

