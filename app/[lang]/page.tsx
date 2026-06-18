import type { Metadata } from "next";
import AfricaMap from "../components/AfricaMap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getDictionary } from "../dictionaries";
import { getActivePromos } from "@/app/lib/promos";
import PromoCodeStrip from "../components/PromoCodeStrip";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MARYA | Premium Sports Betting",
  description: "Experience the ultimate edge in sports betting.",
};

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'fr' | 'es' }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const topPromos = (await getActivePromos()).slice(0, 3);

  // Find 1XBET promo for hero highlight — fall back to first active promo
  const xbetPromo = topPromos.find(p =>
    p.bookmaker?.toUpperCase().includes("1XBET") || p.bookmaker?.toUpperCase().includes("1X")
  ) ?? topPromos[0];


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
          background: 
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(47, 165, 232, 0.2) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(33, 150, 243, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 20% 80%, rgba(255, 213, 79, 0.08) 0%, transparent 50%),
            linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
          color: var(--text-primary);
          overflow: hidden;
          position: relative;
          text-align: center;
        }
        .hero-section::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(47, 165, 232, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          animation: heroPulse 6s ease-in-out infinite;
        }
        @keyframes heroPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
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
          color: #ffffff;
        }
        .hero-title span {
          background: linear-gradient(135deg, var(--text-primary), var(--cyan-glow));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 30px rgba(47, 165, 232, 0.5));
        }
        .hero-desc {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 48px;
          max-width: 600px;
          font-weight: 400;
        }
        .btn-primary {
          padding: 22px 64px;
          background: linear-gradient(135deg, var(--cyan) 0%, var(--electric) 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 1.1rem;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 8px 32px rgba(47, 165, 232, 0.35), inset 0 1px 0 rgba(255,255,255,0.2);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }
        .btn-primary:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 48px rgba(47, 165, 232, 0.5), inset 0 1px 0 rgba(255,255,255,0.3);
          letter-spacing: 0.15em;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: all 0.6s;
        }
        .btn-primary:hover::before {
          left: 100%;
        }
        .grid-bg {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          z-index: 1;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 70%);
        }

        /* 1. Ticker Section */
        .ticker-section { 
          background: var(--navy-light); 
          padding: 40px 0; 
          overflow: hidden; 
          border-top: 1px solid var(--border); 
          border-bottom: 1px solid var(--border); 
        }
        .ticker-content { display: flex; align-items: center; gap: 100px; white-space: nowrap; animation: ticker 30s linear infinite; }
        .ticker-img { height: 48px; width: auto; object-fit: contain; filter: brightness(0.8) contrast(1.2); transition: all 0.4s ease; cursor: pointer; }
        .ticker-img:hover { filter: brightness(1) saturate(1); transform: scale(1.08); }
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        /* 2. Features Section */
        .features-section { padding: 120px 24px; max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 80px; }
        .section-title { 
          font-size: 3rem; 
          font-weight: 900; 
          margin-bottom: 20px; 
          text-transform: uppercase; 
          color: var(--text-primary);
          letter-spacing: 0.02em;
        }
        .section-subtitle { color: var(--text-secondary); font-size: 1.15rem; max-width: 600px; margin: 0 auto; line-height: 1.7; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
        .feature-card { 
          padding: 48px 32px; 
          border: 1px solid var(--border); 
          border-radius: 20px; 
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(18, 72, 115, 0.15);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
        }
        .feature-card:hover { 
          border-color: var(--cyan); 
          transform: translateY(-8px); 
          box-shadow: 0 20px 48px rgba(18, 72, 115, 0.3); 
        }
        .feature-number { 
          font-size: 4rem; 
          font-weight: 900; 
          background: linear-gradient(135deg, rgba(22, 86, 140, 0.25), rgba(22, 86, 140, 0.1));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1; 
          margin-bottom: 24px; 
        }
        .feature-card h3 { font-size: 1.4rem; margin-bottom: 16px; font-weight: 800; color: var(--navy-deep); }
        .feature-card p { color: #557091; line-height: 1.7; }

        /* 3. Steps Section */
        .steps-section { 
          padding: 120px 24px; 
          background: linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-deep) 100%);
          border-top: 1px solid var(--border); 
          border-bottom: 1px solid var(--border); 
          color: var(--text-primary); 
          position: relative;
        }
        .steps-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse 60% 40% at 50% 50%, rgba(47, 165, 232, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .steps-container { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; position: relative; z-index: 1; }
        .step-row { 
          display: flex; 
          align-items: center; 
          gap: 40px; 
          padding: 48px; 
          background: rgba(255, 255, 255, 0.08);
          border-radius: 20px; 
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }
        .step-row:hover {
          border-color: var(--cyan);
          background: rgba(255, 255, 255, 0.12);
        }
        .step-indicator { 
          font-size: 2rem; 
          font-weight: 900; 
          width: 80px; 
          height: 80px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          border: 2px solid var(--cyan); 
          border-radius: 50%; 
          flex-shrink: 0; 
          color: var(--cyan); 
          text-shadow: 0 0 20px rgba(47, 165, 232, 0.35);
          font-family: 'Space Mono', monospace;
        }
        .step-content h3 { font-size: 1.8rem; margin-bottom: 12px; font-weight: 800; color: #ffffff; }
        .step-content p { color: var(--text-secondary); font-size: 1.1rem; line-height: 1.7; }

        /* 4. Leaderboard Section */
        .codes-section { padding: 120px 24px; max-width: 1000px; margin: 0 auto; }
        .codes-list { display: flex; flex-direction: column; gap: 16px; }
        .code-item { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          padding: 32px 40px; 
          background: #ffffff;
          border: 1px solid var(--border); 
          border-radius: 16px; 
          box-shadow: 0 8px 24px rgba(18, 72, 115, 0.1);
          transition: all 0.3s ease; 
        }
        .code-item:hover { 
          border-color: var(--cyan); 
          box-shadow: 0 12px 36px rgba(18, 72, 115, 0.25);
          transform: translateY(-2px);
        }
        .code-info { display: flex; flex-direction: column; gap: 8px; }
        .code-platform { font-size: 1.5rem; font-weight: 900; text-transform: uppercase; color: var(--navy-deep); }
        .code-offer { color: #557091; font-size: 1.05rem; }
        .code-value { 
          background: linear-gradient(135deg, var(--cyan), var(--electric)); 
          color: #fff; 
          padding: 14px 36px; 
          font-weight: 900; 
          border-radius: 12px; 
          letter-spacing: 0.12em; 
          font-size: 1.1rem; 
          cursor: pointer; 
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
          border: none; 
          box-shadow: 0 4px 16px rgba(47, 165, 232, 0.3);
          font-family: 'Space Mono', monospace;
        }
        .code-value:hover { 
          transform: scale(1.06) translateY(-2px); 
          box-shadow: 0 8px 28px rgba(47, 165, 232, 0.5); 
        }

        /* 5. Stats Section */
        .stats-section { 
          padding: 120px 24px; 
          background: var(--navy-deep);
          color: var(--text-primary); 
          text-align: center;
          position: relative;
        }
        .stats-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, var(--cyan), transparent);
        }
        .stats-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; }
        .stat-box h4 { 
          font-size: 4.5rem; 
          font-weight: 900; 
          margin-bottom: 8px; 
          letter-spacing: -0.05em; 
          background: linear-gradient(135deg, var(--gold), #ffb300);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 20px rgba(255, 213, 79, 0.25));
          font-family: 'Space Mono', monospace;
        }
        .stat-box p { font-size: 1.1rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.12em; }

        /* 6. CTA Section */
        .cta-section { 
          padding: 160px 24px; 
          text-align: center; 
          background: 
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(47, 165, 232, 0.15) 0%, transparent 60%),
            linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 100%); 
          color: #ffffff; 
          position: relative;
        }
        .cta-content { max-width: 800px; margin: 0 auto; position: relative; z-index: 1; }
        .cta-title { 
          font-size: clamp(2.5rem, 5vw, 4.5rem); 
          font-weight: 900; 
          margin-bottom: 40px; 
          text-transform: uppercase; 
          line-height: 1.1; 
          color: #ffffff;
          letter-spacing: 0.02em;
        }

        .btn-ghost {
          padding: 22px 40px;
          background: transparent;
          color: var(--text-secondary);
          font-weight: 700;
          font-size: 1rem;
          border-radius: 14px;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.06em;
        }
        .btn-ghost:hover {
          border-color: var(--cyan);
          color: var(--cyan);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @media (max-width: 768px) {
          .step-row { flex-direction: column; text-align: center; padding: 32px 24px; }
          .code-item { flex-direction: column; gap: 24px; text-align: center; padding: 24px; }
          .code-value { width: 100%; }
          .ticker-content { gap: 40px; }
          .ticker-img { height: 32px; }
          .stat-box h4 { font-size: 3rem; }
          .features-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr; gap: 32px; }
          .hero-section { padding: 100px 20px 40px; }
          .section-title { font-size: 2.2rem; }
        }
      `}} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="grid-bg"></div>
        <div className="hero-content">

          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(47, 165, 232, 0.12)",
            border: "1px solid rgba(47, 165, 232, 0.4)",
            borderRadius: "9999px",
            padding: "8px 20px",
            marginBottom: "28px",
            fontSize: "0.78rem",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--cyan)",
          }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--cyan)", boxShadow: "0 0 8px var(--cyan)", display: "inline-block", animation: "pulse 1.8s ease-in-out infinite" }} />
            Top 1% Exclusive · Verified Today
          </div>

          {/* Main headline */}
          <h1 className="hero-title" style={{ marginBottom: "16px" }}>
            1XBET PROMO CODE<br />
            <span style={{
              fontFamily: "'Space Mono', monospace",
              background: "linear-gradient(135deg, var(--gold), #ffb300)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 24px rgba(255,213,79,0.4))",
              letterSpacing: "0.12em",
            }}>
              {xbetPromo ? xbetPromo.promoCode : "MARYA"}
            </span>
          </h1>

          {/* Bonus amount pill */}
          {xbetPromo && (
            <div style={{
              display: "inline-block",
              background: "rgba(255, 213, 79, 0.1)",
              border: "1px solid rgba(255, 213, 79, 0.35)",
              borderRadius: "12px",
              padding: "10px 28px",
              marginBottom: "24px",
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "var(--gold)",
              letterSpacing: "0.04em",
            }}>
              🎁 {xbetPromo.bonusAmount}
            </div>
          )}

          {/* Sales pitch */}
          <p className="hero-desc">
            Enter code <strong style={{ color: "var(--cyan)", fontFamily: "'Space Mono', monospace" }}>{xbetPromo ? xbetPromo.promoCode : "MARYA"}</strong> at signup and unlock the industry&apos;s highest welcome bonus — exclusively negotiated for MARYA users. More value, lower wagering, instant activation.
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "32px" }}>
            {xbetPromo?.affiliateUrl ? (
              <a
                href={xbetPromo.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ textDecoration: "none", display: "inline-block" }}
              >
                CLAIM BONUS NOW →
              </a>
            ) : (
              <button className="btn-primary">CLAIM BONUS NOW →</button>
            )}
            <button className="btn-ghost">VIEW ALL CODES</button>
          </div>

          {/* Trust line */}
          <p style={{
            fontSize: "0.78rem",
            color: "var(--text-muted)",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}>
            ✓ No Deposit Required to Register &nbsp;·&nbsp; ✓ Verified {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })} &nbsp;·&nbsp; ✓ Instant Activation
          </p>

          <PromoCodeStrip promos={topPromos.map(p => ({ id: p.id, bookmaker: p.bookmaker, promoCode: p.promoCode, bonusAmount: p.bonusAmount }))} />
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
