import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getDictionary } from "../dictionaries";

export const metadata: Metadata = {
  title: {
    template: "%s | Marya Bet",
    default: "Promo Codes",
  },
};

export default async function PromosLayout({ children }: { children: ReactNode }) {
  const dict = await getDictionary('en');
  
  return (
    <div className="home-wrapper">
      <Navbar dict={dict} lang="en" />
      {children}
      <Footer />
    </div>
  );
}

