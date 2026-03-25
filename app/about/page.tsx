export default function AboutPage() {
  return (
    <main className="content-page" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 0" }}>
      <h1 className="home-hero__title" style={{ fontSize: "3rem", marginBottom: "16px", textAlign: "center" }}>About Marya Bet</h1>
      <p className="home-hero__desc" style={{ textAlign: "center", margin: "0 auto 60px", maxWidth: "600px" }}>
        Your trusted source for sports betting insights, exclusive promotional codes, and independent sportsbook reviews.
      </p>

      <section className="about-section" style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px", color: "var(--text-home)" }}>Our Mission</h2>
        <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6", marginBottom: "16px" }}>
          Marya Bet was founded by a team of sports enthusiasts and betting professionals who wanted to bring transparency to the online gambling industry. Our mission is to equip bettors of all levels with the knowledge, tools, and the best exclusive bonuses to maximize their edge against the house.
        </p>
      </section>

      <section className="about-section" style={{ marginBottom: "40px", padding: "32px", background: "var(--card-bg)", borderRadius: "16px", border: "1px solid var(--card-border)" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px", color: "var(--text-home)" }}>Affiliate Disclosure</h2>
        <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6", marginBottom: "16px" }}>
          Transparency is our core value. Marya Bet is an independent affiliate website. This means we may earn a commission if you click on the links to our partnered sportsbooks (such as Stake, 1xBet, or Betway) and create an account. 
        </p>
        <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6" }}>
          This compensation helps keep our content, guides, and premium promo codes completely free for our users. Rest assured, this does not affect our independent reviews, nor does it alter the odds or services provided by the bookmakers.
        </p>
      </section>

      <section className="about-section" style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px", color: "var(--text-home)" }}>Responsible Gaming</h2>
        <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6", marginBottom: "16px" }}>
          Sports betting should always be an entertaining and enjoyable experience. We strongly advocate for responsible gambling. Never bet more than you can afford to lose, and never chase your losses.
        </p>
        <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6", fontWeight: "600" }}>
          If you or someone you know has a gambling problem, help is available. Please contact gambling support organizations such as GamCare or Gamblers Anonymous in your local jurisdiction. You must be 18+ (or 21+ depending on your region) to participate in online sports betting.
        </p>
      </section>

      <section className="about-section" style={{ textAlign: "center", marginTop: "60px" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "16px", color: "var(--text-home)" }}>Want to get in touch?</h2>
        <a href="mailto:contact@dicebets.example.com" className="home-btn home-btn--primary">Contact Us</a>
      </section>
    </main>
  );
}
