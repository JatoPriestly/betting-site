import Image from "next/image";

export default function FAQPage() {
  return (
    <main className="content-page" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 0" }}>
      <h1 className="home-hero__title" style={{ fontSize: "3rem", marginBottom: "16px", textAlign: "center" }}>Frequently Asked Questions</h1>
      <p className="home-hero__desc" style={{ textAlign: "center", margin: "0 auto 40px", maxWidth: "600px" }}>
        Everything you need to know about betting with our partnered bookmakers, claiming promos, and understanding odds.
      </p>

      <div style={{ position: "relative", width: "100%", height: "280px", marginBottom: "40px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
        <Image src="/faq_hero_sports.png" alt="FAQ Sports 3D" fill style={{ objectFit: "cover", objectPosition: "center 20%" }} priority />
      </div>

      <div className="faq-list" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div className="faq-item" style={{ background: "var(--card-bg)", padding: "32px", borderRadius: "16px", border: "1px solid var(--card-border)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-home)" }}>How do I claim the MARYAVIP promo code?</h3>
          <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6" }}>
            To claim your exclusive MARYA VIP bonus, click the "Get Started" link next to your preferred bookmaker on our Promos page. During registration, ensure the code "MARYAVIP" is entered in the promotional code field. Your welcome bonus will be automatically credited upon your first qualifying deposit.
          </p>
        </div>

        <div className="faq-item" style={{ background: "var(--card-bg)", padding: "32px", borderRadius: "16px", border: "1px solid var(--card-border)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-home)" }}>Are these betting platforms legal?</h3>
          <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6" }}>
            Yes, we only partner with licensed and regulated sportsbooks. Availability depends on your jurisdiction. Please check our global availability map or the terms and conditions of the specific bookmaker to ensure they legally operate in your region.
          </p>
        </div>

        <div className="faq-item" style={{ background: "var(--card-bg)", padding: "32px", borderRadius: "16px", border: "1px solid var(--card-border)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-home)" }}>What are rollover requirements?</h3>
          <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6" }}>
            A rollover (or wagering) requirement is a condition set by the bookmaker before you can withdraw bonus funds. For example, a 5x rollover on a $100 bonus means you must place $500 worth of bets before the bonus converts to withdrawable cash.
          </p>
        </div>

        <div className="faq-item" style={{ background: "var(--card-bg)", padding: "32px", borderRadius: "16px", border: "1px solid var(--card-border)" }}>
          <h3 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "12px", color: "var(--text-home)" }}>How fast are the payouts?</h3>
          <p style={{ color: "var(--text-home-muted)", lineHeight: "1.6" }}>
            Payout speeds vary by method and platform. Crypto withdrawals (available on Stake and 1xBet) are typically instant or processed within an hour. E-wallets take up to 24 hours, while bank transfers may take 2-5 business days.
          </p>
        </div>
      </div>
    </main>
  );
}
