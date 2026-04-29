import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { Rye } from "next/font/google";

const rye = Rye({
  weight: "400",
  subsets: ["latin"],
});

import { getDictionary } from "./dictionaries";

export const metadata: Metadata = {
  title: "MARYA BET | Premium Sports Betting",
  description: "Experience the ultimate edge in sports betting.",
};

export default async function Home() {
  const dict = await getDictionary('en');
  
  return (
    <>
      <Navbar dict={dict} lang="en" />

      <style dangerouslySetInnerHTML={{__html: `
        .hero-section {
          min-height: 100vh;
          padding: 160px 24px 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.1) 0%, #111111 60%, #000000 100%);
          color: #FFFFFF;
          font-family: system-ui, sans-serif;
          overflow: hidden;
          position: relative;
          text-align: center;
        }
        .hero-content {
          max-width: 800px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hero-title {
          font-size: clamp(3.5rem, 6vw, 6rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }
        .hero-title span {
          color: #FFFFFF;
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.6);
        }
        .hero-desc {
          font-size: 1.25rem;
          color: #CCCCCC;
          line-height: 1.6;
          margin-bottom: 48px;
          max-width: 600px;
          font-weight: 400;
        }
        .btn-primary {
          padding: 18px 48px;
          background: #FFFFFF;
          color: #000000;
          font-weight: 800;
          font-size: 1.2rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
          letter-spacing: 0.05em;
        }
        .btn-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(255, 255, 255, 0.4);
          background: #EEEEEE;
        }
        .grid-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 1;
        }

        /* 1. Ticker Section */
        .ticker-section { background: #050505; padding: 40px 0; overflow: hidden; border-top: 1px solid #222; border-bottom: 1px solid #222; }
        .ticker-content { display: flex; gap: 80px; white-space: nowrap; animation: ticker 20s linear infinite; }
        .ticker-item { font-size: 1.5rem; font-weight: 900; color: #444; text-transform: uppercase; letter-spacing: 0.1em; }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* 2. Features Section */
        .features-section { padding: 120px 24px; max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-title { font-size: 3rem; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; }
        .section-subtitle { color: #888; font-size: 1.2rem; max-width: 600px; margin: 0 auto; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
        .feature-card { padding: 48px 40px; border: 1px solid #222; border-radius: 16px; background: #0a0a0a; transition: all 0.3s; }
        .feature-card:hover { border-color: #fff; transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
        .feature-number { font-size: 5rem; font-weight: 900; color: #1a1a1a; line-height: 1; margin-bottom: 24px; }
        .feature-card h3 { font-size: 1.5rem; margin-bottom: 16px; font-weight: 800; }
        .feature-card p { color: #777; line-height: 1.6; }

        /* 3. Steps Section */
        .steps-section { padding: 120px 24px; background: #030303; border-top: 1px solid #111; border-bottom: 1px solid #111; }
        .steps-container { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
        .step-row { display: flex; align-items: center; gap: 40px; padding: 48px; background: #0a0a0a; border-radius: 16px; border: 1px solid #222; }
        .step-indicator { font-size: 2rem; font-weight: 900; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; border-radius: 50%; flex-shrink: 0; }
        .step-content h3 { font-size: 2rem; margin-bottom: 12px; font-weight: 800; }
        .step-content p { color: #888; font-size: 1.1rem; line-height: 1.6; }

        /* 4. Leaderboard Section */
        .codes-section { padding: 120px 24px; max-width: 1000px; margin: 0 auto; }
        .codes-list { display: flex; flex-direction: column; gap: 16px; }
        .code-item { display: flex; justify-content: space-between; align-items: center; padding: 32px 40px; background: #0a0a0a; border: 1px solid #222; border-radius: 12px; transition: border-color 0.2s; }
        .code-item:hover { border-color: #555; }
        .code-info { display: flex; flex-direction: column; gap: 8px; }
        .code-platform { font-size: 1.5rem; font-weight: 900; text-transform: uppercase; }
        .code-offer { color: #888; font-size: 1.1rem; }
        .code-value { background: #fff; color: #000; padding: 12px 32px; font-weight: 900; border-radius: 8px; letter-spacing: 0.1em; font-size: 1.2rem; cursor: pointer; transition: transform 0.2s; }
        .code-value:hover { transform: scale(1.05); }

        /* 5. Stats Section */
        .stats-section { padding: 120px 24px; background: #fff; color: #000; text-align: center; }
        .stats-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; }
        .stat-box h4 { font-size: 5rem; font-weight: 900; margin-bottom: 8px; letter-spacing: -0.05em; }
        .stat-box p { font-size: 1.2rem; font-weight: 800; color: #666; text-transform: uppercase; letter-spacing: 0.1em; }

        /* 6. CTA Section */
        .cta-section { padding: 160px 24px; text-align: center; background: #000; }
        .cta-content { max-width: 800px; margin: 0 auto; }
        .cta-title { font-size: clamp(3rem, 5vw, 4.5rem); font-weight: 900; margin-bottom: 40px; text-transform: uppercase; line-height: 1.1; }

        @media (max-width: 768px) {
          .step-row { flex-direction: column; text-align: center; padding: 32px 24px; }
          .code-item { flex-direction: column; gap: 24px; text-align: center; padding: 24px; }
          .code-value { width: 100%; }
        }
      `}} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="grid-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            THE PREMIER <br/>
            <span>SPORTS</span> BOOK.
          </h1>
          <p className="hero-desc">
            Get the ultimate edge with exclusive odds, instant payouts, and the industry&apos;s highest value promotional codes.
          </p>
          <button className="btn-primary">START WINNING NOW</button>
        </div>
      </section>

      {/* 1. Ticker Section */}
      <section className="ticker-section">
        <div className="ticker-content">
          <div className="ticker-item">1XBET PROMOS</div>
          <div className="ticker-item">BETMGM OFFERS</div>
          <div className="ticker-item">STAKE BONUSES</div>
          <div className="ticker-item">DRAFTKINGS CODES</div>
          <div className="ticker-item">BET365 BOOSTS</div>
          <div className="ticker-item">FANDUEL REWARDS</div>
          {/* Duplicate for infinite scroll effect */}
          <div className="ticker-item">1XBET PROMOS</div>
          <div className="ticker-item">BETMGM OFFERS</div>
          <div className="ticker-item">STAKE BONUSES</div>
          <div className="ticker-item">DRAFTKINGS CODES</div>
          <div className="ticker-item">BET365 BOOSTS</div>
          <div className="ticker-item">FANDUEL REWARDS</div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose Marybet</h2>
          <p className="section-subtitle">We don&apos;t just list codes. We negotiate the highest possible welcome bonuses across every major betting platform so you start with an unfair advantage.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">01</div>
            <h3>Exclusive Partnerships</h3>
            <p>Our codes offer higher match percentages and lower wagering requirements than the standard public offers found elsewhere.</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">02</div>
            <h3>Verified Daily</h3>
            <p>Every single promo code is tested every 24 hours. No expired codes, no invalid links, just pure immediate value.</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">03</div>
            <h3>Every Platform Covered</h3>
            <p>Whether you prefer crypto casinos or traditional sportsbooks, we have the definitive master code for your platform of choice.</p>
          </div>
        </div>
      </section>

      {/* 3. Steps Section */}
      <section className="steps-section">
        <div className="section-header">
          <h2 className="section-title">Claim Your Edge</h2>
        </div>
        <div className="steps-container">
          <div className="step-row">
            <div className="step-indicator">1</div>
            <div className="step-content">
              <h3>Select Your Platform</h3>
              <p>Browse our curated list of top-tier sportsbooks and casinos. We only feature platforms with proven payout histories and excellent odds.</p>
            </div>
          </div>
          <div className="step-row" style={{ flexDirection: "row-reverse", textAlign: "right" }}>
            <div className="step-indicator">2</div>
            <div className="step-content">
              <h3>Copy The Master Code</h3>
              <p>Grab the exclusive Marybet promo code. This specific code triggers the elevated bonus tier during your registration process.</p>
            </div>
          </div>
          <div className="step-row">
            <div className="step-indicator">3</div>
            <div className="step-content">
              <h3>Maximize Your Bankroll</h3>
              <p>Paste the code at signup, make your first deposit, and instantly receive your multiplied bankroll. You are now ready to dominate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Leaderboard Section */}
      <section className="codes-section">
        <div className="section-header">
          <h2 className="section-title">Top Active Codes</h2>
          <p className="section-subtitle">The most lucrative, verified promotional codes available right now.</p>
        </div>
        <div className="codes-list">
          <div className="code-item">
            <div className="code-info">
              <span className="code-platform">1XBET GLOBAL</span>
              <span className="code-offer">200% First Deposit Match up to $130</span>
            </div>
            <button className="code-value">MARYVIP</button>
          </div>
          <div className="code-item">
            <div className="code-info">
              <span className="code-platform">STAKE CASINO</span>
              <span className="code-offer">Instant 5% Rakeback + $25 Free Play</span>
            </div>
            <button className="code-value">MARYA</button>
          </div>
          <div className="code-item">
            <div className="code-info">
              <span className="code-platform">BETMGM SPORTS</span>
              <span className="code-offer">Up to $1500 Paid Back in Bonus Bets</span>
            </div>
            <button className="code-value">MARYMGM</button>
          </div>
        </div>
      </section>

      {/* 5. Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-box">
            <h4>$2.5M+</h4>
            <p>Bonuses Claimed</p>
          </div>
          <div className="stat-box">
            <h4>5+</h4>
            <p>Verified Platforms</p>
          </div>
          <div className="stat-box">
            <h4>50K+</h4>
            <p>Active Bettors</p>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Stop Betting With Less Than You Deserve.</h2>
          <button className="btn-primary">BROWSE ALL PROMO CODES</button>
        </div>
      </section>
    </>
  );
}
