"use client";

import Link from "next/link";
import { ShieldCheck, Globe, Link2, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .site-footer {
          background: #050505;
          color: #fff;
          padding: 100px 40px 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
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
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
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
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        }

        .nuro-logo__dot {
          width: 10px;
          height: 10px;
          background: #000;
          border-radius: 50%;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }

        .site-footer__desc {
          color: #777;
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
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .social-link:hover {
          background: #fff;
          color: #000;
          transform: translateY(-8px) rotate(8deg);
          box-shadow: 0 15px 30px rgba(255, 255, 255, 0.1);
          border-color: #fff;
        }

        .site-footer__title {
          font-size: 0.75rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #444;
          margin-bottom: 4px;
        }

        .site-footer__nav {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .site-footer__nav a {
          color: #888;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        .site-footer__nav a:hover {
          color: #fff;
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
          background: rgba(255, 255, 255, 0.02);
          padding: 32px;
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .compliance-badges {
          display: flex;
          gap: 14px;
          margin-top: 4px;
        }

        .badge-18 {
          padding: 6px 14px;
          border: 1px solid #ff4d4d;
          color: #ff4d4d;
          border-radius: 8px;
          font-weight: 900;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }

        .badge-secure {
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border-radius: 8px;
          font-weight: 800;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .site-footer__bottom {
          margin-top: 100px;
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #444;
          font-size: 0.9rem;
        }

        .site-footer__bottom-links {
          display: flex;
          gap: 32px;
        }

        .site-footer__bottom-links a {
          color: #444;
          text-decoration: none;
          transition: color 0.3s;
          font-weight: 600;
        }

        .site-footer__bottom-links a:hover {
          color: #fff;
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
            <p className="site-footer__desc">
              Precision odds analysis, verified promotional codes, and premium sportsbook insights for the professional bettor.
            </p>
            <div className="site-footer__socials">
              <a href="#" className="social-link" aria-label="Global"><Globe size={20} /></a>
              <a href="#" className="social-link" aria-label="Connect"><Link2 size={20} /></a>
              <a href="#" className="social-link" aria-label="Mail"><Mail size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="site-footer__col">
            <h4 className="site-footer__title">Platform</h4>
            <nav className="site-footer__nav">
              <Link href="/">Live Dashboard</Link>
              <Link href="/promos">Bonus Tracker</Link>
              <Link href="/guides">Market Analysis</Link>
              <Link href="/blog">Expert Insights</Link>
            </nav>
          </div>

          {/* Support */}
          <div className="site-footer__col">
            <h4 className="site-footer__title">Assistance</h4>
            <nav className="site-footer__nav">
              <Link href="/faq">Support Center</Link>
              <Link href="/terms">Compliance</Link>
              <Link href="/privacy">Data Privacy</Link>
              <Link href="/admin">Partner Login</Link>
            </nav>
          </div>

          {/* Compliance */}
          <div className="site-footer__col site-footer__compliance">
            <h4 className="site-footer__title">Integrity & Responsibility</h4>
            <div className="compliance-badges">
              <span className="badge-18">18+ ONLY</span>
              <span className="badge-secure"><ShieldCheck size={16} /> SSL SECURE</span>
            </div>
            <p className="site-footer__desc" style={{ fontSize: "0.85rem", color: "#444", marginTop: "12px", maxWidth: "100%" }}>
              Marya Bet advocates for responsible gambling. Betting should be entertaining, not a financial burden. If you need support, please contact <a href="https://www.begambleaware.org" target="_blank" rel="noreferrer" style={{ color: "#666", textDecoration: "underline" }}>BeGambleAware.org</a>.
            </p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {currentYear} Marya Bet. Engineered for Excellence.</p>
          <div className="site-footer__bottom-links">
            <Link href="/cookies">Preferences</Link>
            <Link href="/sitemap">Site Architecture</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
