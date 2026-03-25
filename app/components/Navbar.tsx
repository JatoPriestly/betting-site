"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  // Helper to determine if a link is active
  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return pathname === path;
  };

  return (
    <nav className="home-nav">
      <div className="home-nav__logo">
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Image src="/logo.png" alt="Marya Bet Logo" width={28} height={28} style={{ borderRadius: "6px" }} />
          MARYA BET
        </Link>
      </div>
      <div className="home-nav__links">
        <Link
          href="/"
          className={`home-nav__link ${isActive("/") ? "home-nav__link--active" : ""}`}
        >
          Home
          {isActive("/") && <span className="home-nav__indicator" />}
        </Link>
        <Link
          href="/promos"
          className={`home-nav__link ${isActive("/promos") ? "home-nav__link--active" : ""}`}
        >
          Promos
          {isActive("/promos") && <span className="home-nav__indicator" />}
        </Link>
        <Link
          href="/blog"
          className={`home-nav__link ${isActive("/blog") ? "home-nav__link--active" : ""}`}
        >
          Blog
          {isActive("/blog") && <span className="home-nav__indicator" />}
        </Link>
        <Link
          href="/guides"
          className={`home-nav__link ${isActive("/guides") ? "home-nav__link--active" : ""}`}
        >
          Guides
          {isActive("/guides") && <span className="home-nav__indicator" />}
        </Link>
        <Link
          href="/faq"
          className={`home-nav__link ${isActive("/faq") ? "home-nav__link--active" : ""}`}
        >
          FAQ
          {isActive("/faq") && <span className="home-nav__indicator" />}
        </Link>
      </div>
      <div className="home-nav__actions">
        <ThemeToggle />
        <Link href="/admin/login" className="home-nav__login-btn">
          Log In
        </Link>
      </div>
    </nav>
  );
}
