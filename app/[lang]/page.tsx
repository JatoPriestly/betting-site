import type { Metadata } from "next";
import AfricaMap from "../components/AfricaMap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getDictionary } from "../dictionaries";
import { getActivePromos } from "@/app/lib/promos";

export const metadata: Metadata = {
  title: "MARYA | Premium Sports Betting",
  description: "Experience the ultimate edge in sports betting.",
};

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'fr' | 'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const topPromos = (await getActivePromos()).slice(0, 3);


  return (
    <>
      <Navbar dict={dict} lang={lang} />
      <style dangerouslySetInnerHTML={{__html: `
        .hero-section {
          min-height: 100vh;
          padding: 120px 24px 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.1) 0%, #111111 60%, #000000 100%);
          color: #FFFFFF;
          font-family: system-ui, sans-serif;
          overflow: hidden;
          position: relative;
          text-align: center;
        }
        .hero-content {
          max-width: 1000px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 5rem);
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
          padding: 22px 64px;
          background: #FFFFFF;
          color: #000000;
          font-weight: 900;
          font-size: 1.1rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
        }
        .btn-primary:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px rgba(255, 255, 255, 0.3);
          background: #FFFFFF;
          letter-spacing: 0.2em;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          transition: all 0.6s;
        }
        .btn-primary:hover::before {
          left: 100%;
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
        .ticker-content { display: flex; align-items: center; gap: 100px; white-space: nowrap; animation: ticker 30s linear infinite; }
        .ticker-img { height: 48px; width: auto; object-fit: contain; filter: grayscale(1) opacity(0.4); transition: all 0.3s ease; cursor: pointer; }
        .ticker-img:hover { filter: grayscale(0) opacity(1); transform: scale(1.05); }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* 2. Features Section */
        .features-section { padding: 120px 24px; max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-title { font-size: 3rem; font-weight: 900; margin-bottom: 20px; text-transform: uppercase; }
        .section-subtitle { color: #888; font-size: 1.2rem; max-width: 600px; margin: 0 auto; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px; }
        .feature-card { padding: 48px 32px; border: 1px solid #222; border-radius: 16px; background: #0a0a0a; transition: all 0.3s; }
        .feature-card:hover { border-color: #fff; transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
        .feature-number { font-size: 4rem; font-weight: 900; color: #1a1a1a; line-height: 1; margin-bottom: 24px; }
        .feature-card h3 { font-size: 1.4rem; margin-bottom: 16px; font-weight: 800; }
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
          .ticker-content { gap: 40px; }
          .ticker-img { height: 32px; }
          .stat-box h4 { font-size: 3.5rem; }
          .features-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="grid-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            {dict.hero.title1} <br/>
            <span>{dict.hero.title2}</span> {dict.hero.title3}
          </h1>
          <p className="hero-desc">
            {dict.hero.desc}
          </p>
          <button className="btn-primary">{dict.hero.btn}</button>
        </div>
      </section>

      {/* 1. Ticker Section */}
      <section className="ticker-section">
        <div className="ticker-content">
          <img src="/1xbet.png" alt="1xBet" className="ticker-img" />
          <img src="/melbet_1.jpg" alt="Melbet" className="ticker-img" />
          <img src="/betpawa.png" alt="Betpawa" className="ticker-img" />
          <img src="/1xbet.png" alt="1xBet" className="ticker-img" />
          <img src="/melbet_1.jpg" alt="Melbet" className="ticker-img" />
          <img src="/betpawa.png" alt="Betpawa" className="ticker-img" />
          {/* Duplicate for infinite scroll effect */}
          <img src="/1xbet.png" alt="1xBet" className="ticker-img" />
          <img src="/melbet_1.jpg" alt="Melbet" className="ticker-img" />
          <img src="/betpawa.png" alt="Betpawa" className="ticker-img" />
          <img src="/1xbet.png" alt="1xBet" className="ticker-img" />
          <img src="/melbet_1.jpg" alt="Melbet" className="ticker-img" />
          <img src="/betpawa.png" alt="Betpawa" className="ticker-img" />
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">{dict.features.title}</h2>
          <p className="section-subtitle">{dict.features.subtitle}</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">01</div>
            <h3>{dict.features.feat1_title}</h3>
            <p>{dict.features.feat1_desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">02</div>
            <h3>{dict.features.feat2_title}</h3>
            <p>{dict.features.feat2_desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">03</div>
            <h3>{dict.features.feat3_title}</h3>
            <p>{dict.features.feat3_desc}</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">04</div>
            <h3>{dict.features.feat4_title}</h3>
            <p>{dict.features.feat4_desc}</p>
          </div>
        </div>
      </section>

      {/* 3. Steps Section */}
      <section className="steps-section">
        <div className="section-header">
          <h2 className="section-title">{dict.steps.title}</h2>
        </div>
        <div className="steps-container">
          <div className="step-row">
            <div className="step-indicator">1</div>
            <div className="step-content">
              <h3>{dict.steps.step1_title}</h3>
              <p>{dict.steps.step1_desc}</p>
            </div>
          </div>
          <div className="step-row" style={{ flexDirection: "row-reverse", textAlign: "right" }}>
            <div className="step-indicator">2</div>
            <div className="step-content">
              <h3>{dict.steps.step2_title}</h3>
              <p>{dict.steps.step2_desc}</p>
            </div>
          </div>
          <div className="step-row">
            <div className="step-indicator">3</div>
            <div className="step-content">
              <h3>{dict.steps.step3_title}</h3>
              <p>{dict.steps.step3_desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Leaderboard Section */}
      <section className="codes-section">
        <div className="section-header">
          <h2 className="section-title">{dict.leaderboard.title}</h2>
          <p className="section-subtitle">{dict.leaderboard.subtitle}</p>
        </div>
        <div className="codes-list">
          {topPromos.map((promo) => (
            <div key={promo.id} className="code-item">
              <div className="code-info">
                <span className="code-platform">{promo.bookmaker}</span>
                <span className="code-offer">{promo.bonusAmount}</span>
              </div>
              <button className="code-value">{promo.promoCode}</button>
            </div>
          ))}
          {topPromos.length === 0 && (
            <div style={{ color: '#888', textAlign: 'center', padding: '20px 0' }}>
              No active promo codes available right now.
            </div>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section style={{ padding: "40px 0", width: "100%", margin: "0 auto" }}>
        <AfricaMap dict={dict} />
      </section>

      {/* 5. Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-box">
            <h4>$2.5M+</h4>
            <p>{dict.stats.claimed}</p>
          </div>
          <div className="stat-box">
            <h4>5+</h4>
            <p>{dict.stats.platforms}</p>
          </div>
          <div className="stat-box">
            <h4>50K+</h4>
            <p>{dict.stats.bettors}</p>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">{dict.cta.title}</h2>
          <button className="btn-primary">{dict.cta.btn}</button>
        </div>
      </section>

      <Footer />
    </>
  );
}
