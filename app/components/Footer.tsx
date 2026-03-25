import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {/* Brand & Description */}
        <div className="site-footer__col site-footer__brand">
          <Link href="/" className="site-footer__logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image src="/logo.png" alt="Marya Bet Logo" width={32} height={32} style={{ borderRadius: "8px" }} />
            MARYA BET
          </Link>
          <p className="site-footer__desc">
            The ultimate sports betting platform for odds analysis, premium promotional codes, and verified match insights. Bet smarter, win more.
          </p>
          <div className="site-footer__socials">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">Instagram</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">YouTube</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="site-footer__col">
          <h4 className="site-footer__title">Navigation</h4>
          <nav className="site-footer__nav">
            <Link href="/">Home</Link>
            <Link href="/promos">Promo Codes</Link>
            <Link href="/guides">Betting Guides</Link>
            <Link href="/blog">Our Blog</Link>
            <Link href="/faq">FAQ Support</Link>
          </nav>
        </div>

        {/* Legal */}
        <div className="site-footer__col">
          <h4 className="site-footer__title">Legal</h4>
          <nav className="site-footer__nav">
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/cookies">Cookie Policy</Link>
            <Link href="/admin">Admin Login</Link>
          </nav>
        </div>

        {/* Compliance */}
        <div className="site-footer__col site-footer__compliance">
          <h4 className="site-footer__title">Responsible Betting</h4>
          <div className="compliance-badges">
            <span className="badge-18">18+</span>
            <span className="badge-secure"><ShieldCheck size={16} /> Secure</span>
          </div>
          <p className="site-footer__desc" style={{ fontSize: "0.8rem", marginTop: "12px" }}>
            Gambling can be addictive. Please bet responsibly. If you or someone you know has a gambling problem and wants help, visit <a href="https://www.begambleaware.org" target="_blank" rel="noreferrer" style={{ textDecoration: "underline", color: "var(--text-home)" }}>BeGambleAware.org</a>.
          </p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p>© {currentYear} Marya Bet. All rights reserved.</p>
      </div>
    </footer>
  );
}
