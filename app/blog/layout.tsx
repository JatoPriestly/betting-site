import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { getDictionary } from "../dictionaries";

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

export default async function BlogLayout({ children }: { children: ReactNode }) {
  const dict = await getDictionary('en');
  
  return (
    <div className="home-wrapper">
      <Navbar dict={dict} lang="en" />
      {children}
      <Footer />
    </div>
  );
}

