"use client";

import Link from "next/link";
import { Rye } from "next/font/google";
import { useState } from "react";
import { locales, localeLabels } from "../i18n";

const rye = Rye({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar({ dict, lang }: { dict: any, lang: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .navbar {
          width: 100%;
          padding: 20px 40px;
          background-color: transparent;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
        }
        .nav-logo-container {
          width: 140px;
          height: 50px;
          display: flex;
          align-items: center;
          overflow: visible;
          z-index: 101;
        }
        .nav-links {
          display: flex;
          gap: 40px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: linear-gradient(135deg, rgba(22, 86, 140, 0.85) 0%, rgba(18, 72, 115, 0.9) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-top-color: rgba(255, 255, 255, 0.3);
          border-bottom-color: rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          padding: 14px 48px;
          box-shadow: 0 8px 32px 0 rgba(18, 72, 115, 0.3), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        .nav-link-item {
          text-decoration: none;
          color: inherit;
          text-shadow: none;
          transition: all 0.2s;
        }
        .nav-link-item:hover {
          color: var(--cyan);
          text-shadow: 0 0 20px rgba(47, 165, 232, 0.6);
        }
        .locale-switcher {
          display: flex;
          gap: 12px;
          font-weight: bold;
          background: rgba(22, 86, 140, 0.9);
          padding: 10px 18px;
          border-radius: 12px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .locale-link {
          text-decoration: none;
          transition: color 0.2s;
        }
        
        .mobile-menu-btn {
          display: none;
          z-index: 101;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px 16px;
          border-radius: 9999px;
          color: #ffffff;
          font-weight: 800;
          cursor: pointer;
          backdrop-filter: blur(8px);
        }

        @media (max-width: 900px) {
          .navbar {
            padding: 16px 20px;
          }
          .nav-links {
            display: ${isOpen ? 'flex' : 'none'};
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 0;
            gap: 30px;
            background: rgba(18, 72, 115, 0.98);
            backdrop-filter: blur(24px);
            padding: 40px;
            font-size: 1.5rem;
          }
          .mobile-menu-btn {
            display: block;
          }
          .locale-switcher {
            display: ${isOpen ? 'flex' : 'none'};
            position: fixed;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 102;
          }
        }
      `}} />
      <nav className="navbar">
        {/* SVG Logo with text bent upwards */}
        <div className="nav-logo-container">
          <Link href={`/${lang}`} style={{ textDecoration: "none", display: "block", overflow: "visible" }}>
            <svg viewBox="-10 -10 220 80" width="140" height="50" style={{ overflow: "visible" }}>
              <path id="upward-curve" d="M 10 50 Q 100 10 190 50" fill="none" />
              <text className={rye.className}>
                <textPath
                  href="#upward-curve"
                  startOffset="50%"
                  textAnchor="middle"
                  style={{
                    fill: "#ffffff",
                    fontSize: "36px",
                    letterSpacing: "0.05em",
                    textShadow: "3px 3px 0px var(--cyan)"
                  }}
                >
                  MARYA
                </textPath>
              </text>
            </svg>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'CLOSE' : 'MENU'}
        </button>
        
        {/* Nav Links - Center (Desktop) or Fullscreen (Mobile) */}
        <div className="nav-links">
          <Link href={`/${lang}/sports`} className="nav-link-item" onClick={() => setIsOpen(false)}>{dict.nav.sports}</Link>
          <Link href={`/${lang}/live`} className="nav-link-item" onClick={() => setIsOpen(false)}>{dict.nav.live}</Link>
          <Link href={`/${lang}/promos`} className="nav-link-item" onClick={() => setIsOpen(false)}>{dict.nav.promos}</Link>
          <Link href={`/${lang}/blog`} className="nav-link-item" onClick={() => setIsOpen(false)}>{dict.nav.blog}</Link>
        </div>

        {/* Locale Switcher - Right (Desktop) or Bottom (Mobile) */}
        <div className="locale-switcher">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              className="locale-link"
              style={{ color: lang === locale ? "var(--cyan)" : "var(--text-muted)" }}
            >
              {localeLabels[locale]}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
