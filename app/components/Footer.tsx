"use client";

import Link from "next/link";
import { ShieldCheck, Globe, Link2, Mail } from "lucide-react";
import en from "../../dictionaries/en.json";

/** `dict` comes from the locale dictionary; English routes fall back to en.json. */
export default function Footer({ dict }: { dict?: any }) {
  const t = dict?.footer ?? en.footer;
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .site-footer {
          background: #0e3c63;
          color: #fff;
          padding: 100px 40px 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          font-family: system-ui, -apple-system, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .site-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent);
        }

        .site-footer__inner {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 80px;
        }

        .site-footer__col {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .site-footer__brand .nuro-logo {
          display: flex;
          align-items: center;
          gap: 14px;
          text-decoration: none;
          color: #fff;
          font-weight: 900;
          font-size: 1.8rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .nuro-logo__icon {
          width: 36px;
          height: 36px;
          background: #fff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.25);
        }

        .nuro-logo__dot {
          width: 10px;
          height: 10px;
          background: var(--navy);
          border-radius: 50%;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }

        .site-footer__desc {
          color: #d1e8ff;
          line-height: 1.7;
          font-size: 1rem;
          max-width: 340px;
          font-weight: 400;
        }

        .site-footer__socials {
          display: flex;
          gap: 16px;
        }

        .social-link {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d1e8ff;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .social-link:hover {
          background: var(--cyan);
          color: #fff;
          transform: translateY(-8px) rotate(8deg);
          box-shadow: 0 15px 30px rgba(47, 165, 232, 0.35);
          border-color: var(--cyan);
        }

        .site-footer__title {
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: var(--cyan-muted);
          margin-bottom: 4px;
        }

        .site-footer__nav {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .site-footer__nav a {
          color: #eef7ff;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        .site-footer__nav a:hover {
          color: var(--cyan);
          transform: translateX(8px);
        }

        .site-footer__nav a::before {
          content: '→';
          font-size: 0.8rem;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .site-footer__nav a:hover::before {
          opacity: 1;
          transform: translateX(0);
        }

        .site-footer__compliance {
          background: rgba(255, 255, 255, 0.05);
          padding: 32px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .compliance-badges {
          display: flex;
          gap: 14px;
          margin-top: 4px;
        }

        .badge-18 {
          padding: 6px 14px;
          border: 1px solid #ff7a7a;
          color: #ff7a7a;
          border-radius: 8px;
          font-weight: 900;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }

        .badge-secure {
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border-radius: 8px;
          font-weight: 800;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .site-footer__bottom {
          margin-top: 100px;
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #a3cdff;
          font-size: 0.9rem;
        }

        .site-footer__bottom-links {
          display: flex;
          gap: 32px;
        }

        .site-footer__bottom-links a {
          color: #a3cdff;
          text-decoration: none;
          transition: color 0.3s;
          font-weight: 600;
        }

        .site-footer__bottom-links a:hover {
          color: var(--cyan);
        }

        @media (max-width: 1200px) {
          .site-footer__inner {
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 40px;
          }
          .site-footer__compliance {
            grid-column: span 3;
          }
        }

        @media (max-width: 768px) {
          .site-footer {
            padding: 80px 24px 40px;
          }
          .site-footer__inner {
            grid-template-columns: 1fr 1fr;
          }
          .site-footer__compliance, .site-footer__brand {
            grid-column: span 2;
          }
          .site-footer__bottom {
            flex-direction: column;
            gap: 24px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .site-footer__inner {
            grid-template-columns: 1fr;
          }
          .site-footer__col {
            grid-column: span 1 !important;
          }
        }
      `}} />

      <footer className="site-footer">
        <div className="site-footer__inner">
          {/* Brand & Description */}
          <div className="site-footer__col site-footer__brand">
            <Link href="/" className="nuro-logo">
              <div className="nuro-logo__icon">
                <div className="nuro-logo__dot" />
              </div>
              <span className="nuro-logo__text">Marya Bet</span>
            </Link>
            <p className="site-footer__desc">{t.desc}</p>
            <div className="site-footer__socials">
              <a href="#" className="social-link" aria-label={t.platform}><Globe size={20} /></a>
              <a href="#" className="social-link" aria-label={t.assistance}><Link2 size={20} /></a>
              <a href="#" className="social-link" aria-label={t.support_center}><Mail size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="site-footer__col">
            <h4 className="site-footer__title">{t.platform}</h4>
            <nav className="site-footer__nav">
              <Link href="/">{t.live_dashboard}</Link>
              <Link href="/promos">{t.bonus_tracker}</Link>
              <Link href="/guides">{t.market_analysis}</Link>
              <Link href="/blog">{t.expert_insights}</Link>
            </nav>
          </div>

          {/* Support */}
          <div className="site-footer__col">
            <h4 className="site-footer__title">{t.assistance}</h4>
            <nav className="site-footer__nav">
              <Link href="/faq">{t.support_center}</Link>
              <Link href="/terms">{t.compliance}</Link>
              <Link href="/privacy">{t.data_privacy}</Link>
              <Link href="/admin">{t.partner_login}</Link>
            </nav>
          </div>

          {/* Compliance */}
          <div className="site-footer__col site-footer__compliance">
            <h4 className="site-footer__title">{t.integrity}</h4>
            <div className="compliance-badges">
              <span className="badge-18">{t.age_badge}</span>
              <span className="badge-secure"><ShieldCheck size={16} /> {t.ssl}</span>
            </div>
            <p className="site-footer__desc" style={{ fontSize: "0.85rem", color: "#d1e8ff", marginTop: "12px", maxWidth: "100%" }}>
              {t.responsible} <a href="https://www.begambleaware.org" target="_blank" rel="noreferrer" style={{ color: "var(--cyan)", textDecoration: "underline" }}>BeGambleAware.org</a>.
            </p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {currentYear} {t.tagline}</p>
          <div className="site-footer__bottom-links">
            <Link href="/cookies">{t.preferences}</Link>
            <Link href="/sitemap">{t.sitemap}</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
