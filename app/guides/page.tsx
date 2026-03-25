import Image from "next/image";
import { BarChart, Target, Coins, Zap } from "lucide-react";

export default function GuidesPage() {
  return (
    <main className="content-page" style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 0" }}>
      <h1 className="home-hero__title" style={{ fontSize: "3rem", marginBottom: "16px", textAlign: "center" }}>Betting Guides</h1>
      <p className="home-hero__desc" style={{ textAlign: "center", margin: "0 auto 40px", maxWidth: "600px" }}>
        Master the fundamentals of sports betting. Whether you're a rookie placing your first wager or a veteran looking for advanced strategies.
      </p>

      <div style={{ position: "relative", width: "100%", height: "400px", marginBottom: "60px", borderRadius: "24px", overflow: "hidden" }}>
        <Image src="/sports_action_hero.png" alt="Sports Action Hero" fill style={{ objectFit: "cover" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-home) 5%, transparent 70%)" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        
        {/* Guide 1 */}
        <div style={{ background: "var(--card-bg)", padding: "32px", borderRadius: "16px", border: "1px solid var(--card-border)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ marginBottom: "16px" }}><BarChart size={32} color="var(--lime)" /></div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-home)" }}>How to Read Odds</h3>
            <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6", marginBottom: "24px", fontSize: "0.95rem" }}>
              Understand the difference between Decimal, Fractional, and American odds. Learn how bookmakers price markets and how to calculate your implied probability.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "auto" }}>
            <div style={{ position: "relative", width: "100%", height: "160px", borderRadius: "8px", overflow: "hidden" }}>
              <Image src="/guide_reading_odds.png" alt="Reading Odds" fill style={{ objectFit: "cover" }} />
            </div>
            <button className="home-btn home-btn--secondary" style={{ padding: "8px 20px", fontSize: "0.9rem", alignSelf: "flex-start" }}>Read Guide</button>
          </div>
        </div>

        {/* Guide 2 */}
        <div style={{ background: "var(--card-bg)", padding: "32px", borderRadius: "16px", border: "1px solid var(--card-border)" }}>
          <div style={{ marginBottom: "16px" }}><Target size={32} color="var(--lime)" /></div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-home)" }}>Over/Under Betting Explained</h3>
          <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6", marginBottom: "24px", fontSize: "0.95rem" }}>
            One of the most popular football markets. Discover strategies for betting on Total Goals (Over/Under 2.5) and how to analyze defensive metrics.
          </p>
          <button className="home-btn home-btn--secondary" style={{ padding: "8px 20px", fontSize: "0.9rem" }}>Read Guide</button>
        </div>

        {/* Guide 3 */}
        <div style={{ background: "var(--card-bg)", padding: "32px", borderRadius: "16px", border: "1px solid var(--card-border)" }}>
          <div style={{ marginBottom: "16px" }}><Coins size={32} color="var(--lime)" /></div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-home)" }}>Bankroll Management</h3>
          <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6", marginBottom: "24px", fontSize: "0.95rem" }}>
            The secret to long-term profitability isn't just picking winners, it's managing your stakes. Learn unit betting, the Kelly Criterion, and flat staking.
          </p>
          <button className="home-btn home-btn--secondary" style={{ padding: "8px 20px", fontSize: "0.9rem" }}>Read Guide</button>
        </div>

        {/* Guide 4 */}
        <div style={{ background: "var(--card-bg)", padding: "32px", borderRadius: "16px", border: "1px solid var(--card-border)" }}>
          <div style={{ marginBottom: "16px" }}><Zap size={32} color="var(--lime)" /></div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-home)" }}>Accumulators (Parlays)</h3>
          <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6", marginBottom: "24px", fontSize: "0.95rem" }}>
            Massive payouts for small stakes. We break down the math behind accumulators and when it actually makes sense to combine your selections.
          </p>
          <button className="home-btn home-btn--secondary" style={{ padding: "8px 20px", fontSize: "0.9rem" }}>Read Guide</button>
        </div>

      </div>
    </main>
  );
}
