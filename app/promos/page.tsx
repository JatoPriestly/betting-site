import { getActivePromos } from "@/app/lib/promos";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CopyButton from "./CopyButton";
import PromoCodeStrip from "@/app/components/PromoCodeStrip";


export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Best Betting Promo Codes",
  description:
    "Exclusive betting promo codes and welcome bonuses for March 2026. Verified offers from top bookmakers — copy your code and claim now.",
  keywords: [
    "betting promo codes",
    "sportsbook promo codes",
    "betting bonus",
    "welcome bonus",
    "free bets",
  ],
  openGraph: {
    title: "Best Betting Promo Codes 2026 | Marya Bet",
    description:
      "Exclusive verified promo codes from the top bookmakers. Copy your code and claim your welcome bonus.",
    type: "website",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating / 2);
  const half = rating / 2 - full >= 0.5;
  return (
    <div className="star-rating" aria-label={`Rating: ${rating} out of 10`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`star ${i < full ? "star--full" : i === full && half ? "star--half" : "star--empty"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  .promo-page { min-height: 100vh; background: var(--navy-deep); color: #fff; font-family: 'Outfit', system-ui, sans-serif; padding-top: 80px; }
  .promo-main { width: 100%; }

  /* Hero */
  .promo-hero { position: relative; overflow: hidden; background: radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06) 0%, var(--navy-deep) 60%); border-bottom: 1px solid var(--border); padding: 80px 24px 60px; text-align: center; }
  .promo-hero__inner { max-width: 1000px; margin: 0 auto; position: relative; z-index: 1; }
  .breadcrumbs { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.78rem; color: var(--text-muted); margin-bottom: 28px; }
  .breadcrumbs a { color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
  .breadcrumbs a:hover { color: #fff; }
  
  .promo-filters { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 32px; }
  .filter-chip { background: var(--navy); border: 1px solid var(--border); color: var(--text-secondary); padding: 8px 18px; border-radius: 99px; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }
  .filter-chip:hover { border-color: var(--cyan); background: var(--navy-light); }
  .filter-chip--active { background: var(--cyan); border-color: var(--cyan); color: #fff; }
  
  .promo-hero__title { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -0.03em; text-transform: uppercase; color: #fff; margin-bottom: 16px; }
  .promo-hero__disclaimer { font-size: 0.78rem; color: var(--text-muted); font-weight: 500; border: 1px solid var(--border); display: inline-block; padding: 6px 16px; border-radius: 99px; margin-top: 8px; }

  /* List */
  .promo-list { max-width: 1000px; margin: 0 auto; padding: 48px 24px; display: flex; flex-direction: column; gap: 16px; }
  .empty-state { text-align: center; padding: 80px 0; color: var(--text-muted); font-size: 1.1rem; }

  /* Card */
  .promo-card { background: var(--navy); border: 1px solid var(--border); border-radius: 16px; transition: background 0.15s, border-color 0.15s; }
  .promo-card:hover { background: var(--navy-light); border-color: var(--cyan); }
  .promo-card__rank-label { background: rgba(255, 255, 255, 0.04); border-bottom: 1px solid var(--border); border-radius: 16px 16px 0 0; padding: 8px 28px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); }
  .promo-card__inner { display: grid; grid-template-columns: 140px 1fr 180px; align-items: stretch; }

  /* Left */
  .promo-card__logo-col { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px 16px; border-right: 1px solid var(--border); }
  .promo-card__logo-box { width: 80px; height: 80px; border-radius: 10px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; position: relative; font-size: 0.75rem; font-weight: 900; color: #fff; overflow: hidden; text-align: center; }
  .promo-card__rank-badge { position: absolute; top: 4px; left: 4px; background: var(--cyan); color: #fff; font-size: 0.65rem; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; }
  .promo-card__logo-img { width: 100%; height: 100%; object-fit: contain; }
  .promo-card__logo-text { padding: 4px; line-height: 1.2; }

  /* Center */
  .promo-card__center { padding: 28px; display: flex; flex-direction: column; gap: 12px; }
  .promo-card__category-header { font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: var(--cyan); }
  .promo-card__bonus-label { font-size: 0.8rem; color: var(--text-secondary); }
  .promo-card__bonus-amount { font-size: 1.6rem; font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1; text-transform: uppercase; }
  
  .promo-card__badges { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; padding: 0; }
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 4px; font-size: 0.68rem; font-weight: 700; border: 1px solid var(--border); color: var(--text-muted); background: var(--navy-deep); }
  .badge--green { color: #fff; border-color: var(--cyan); }
  .badge--gold { color: var(--gold); border-color: var(--border); }
  .badge--blue { color: var(--text-secondary); border-color: var(--border); }

  .promo-card__cta { display: flex; align-items: center; justify-content: center; gap: 6px; max-width: 340px; padding: 12px 16px; background: var(--cyan); color: #fff; font-size: 0.75rem; font-weight: 900; text-decoration: none; border-radius: 6px; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 4px 20px rgba(47,165,232,0.2); }
  .promo-card__cta:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(47,165,232,0.4); letter-spacing: 0.12em; background: var(--cyan-glow); }
  .promo-card__terms { font-size: 0.65rem; color: var(--text-muted); line-height: 1.4; }

  /* Right */
  .promo-card__rating-col { padding: 28px 24px; display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; gap: 12px; border-left: 1px solid var(--border); }
  .promo-card__rating-score { text-align: right; }
  .rating-number { font-size: 2.2rem; font-weight: 900; color: #fff; letter-spacing: -0.05em; line-height: 1; }
  .rating-denom { font-size: 0.9rem; color: var(--text-muted); }
  .promo-card__review-link { font-size: 0.75rem; color: var(--cyan); text-decoration: none; font-weight: 700; text-transform: uppercase; }
  .promo-card__review-link:hover { text-decoration: underline; color: #fff; }
  
  .promo-card__tags { display: flex; flex-wrap: wrap; gap: 4px; justify-content: flex-end; }
  .promo-tag { background: var(--navy-deep); color: var(--text-secondary); padding: 2px 8px; border: 1px solid var(--border); border-radius: 4px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }

  /* SEO */
  .promo-seo-block { max-width: 1000px; margin: 0 auto; padding: 0 24px 80px; }
  .promo-seo-block__inner { background: var(--navy); border: 1px solid var(--border); padding: 48px; border-radius: 20px; }
  .promo-seo-block h2 { font-size: 1.6rem; font-weight: 900; color: #fff; margin-bottom: 16px; text-transform: uppercase; letter-spacing: -0.02em; }
  .promo-seo-block p { color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px; font-size: 0.9rem; }
  .promo-seo-block h3 { font-size: 0.85rem; font-weight: 800; color: #fff; margin: 24px 0 12px; text-transform: uppercase; letter-spacing: 0.08em; }
  .promo-seo-block ol { padding-left: 20px; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
  .promo-seo-block li { color: var(--text-secondary); line-height: 1.6; font-size: 0.9rem; }
  .promo-seo-block li strong { color: #fff; }
  .promo-seo-block__disclaimer { margin-top: 28px; padding: 16px 20px; border: 1px solid var(--border); font-size: 0.8rem; color: var(--text-muted); line-height: 1.6; border-radius: 12px; }
  .promo-seo-block__disclaimer a { color: var(--cyan); text-decoration: underline; }
  .promo-seo-block__disclaimer a:hover { color: #fff; }

  .star-rating { display: flex; gap: 3px; }
  .star { font-size: 0.9rem; }
  .star--full { color: #fff; }
  .star--half { color: var(--text-muted); }
  .star--empty { color: var(--navy-deep); }

  @media (max-width: 700px) {
    .promo-card__inner { grid-template-columns: 1fr; }
    .promo-card__logo-col { border-right: none; border-bottom: 1px solid var(--border); flex-direction: row; justify-content: flex-start; padding: 16px 20px; }
    .promo-card__rating-col { border-left: none; border-top: 1px solid var(--border); align-items: flex-start; }
    .promo-card__terms { text-align: left; }
    .promo-card__tags { justify-content: flex-start; }
    .promo-seo-block__inner { padding: 24px; }
  }
`;

export default async function PromosPage() {
  const promos = await getActivePromos();

  const now = new Date();
  const monthYear = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="promo-page">

      <main className="promo-main">
        {/* Hero */}
        <section className="promo-hero">
          <div className="promo-hero__inner">
            {/* Breadcrumbs */}
            <nav className="breadcrumbs" aria-label="breadcrumb">
              <Link href="/">Home</Link>
              <span>›</span>
              <span>Promo Codes</span>
            </nav>

            {/* Filter chips */}
            <div className="promo-filters">
              <button className="filter-chip filter-chip--active">
                🌍 All Offers
              </button>
              <button className="filter-chip">🏆 Best Bonuses</button>
              <button className="filter-chip">⚽ Football</button>
              <button className="filter-chip">🎰 Casino</button>
              <button className="filter-chip">🆕 New Sites</button>
            </div>

            <h1 className="promo-hero__title">
              The Best Betting Promo Codes in {monthYear}
            </h1>
            <p className="promo-hero__disclaimer">
              New customers only · Commercial content · 18+ age limit ·
              T&amp;Cs apply
            </p>
            <PromoCodeStrip promos={promos.map(p => ({ id: p.id, bookmaker: p.bookmaker, promoCode: p.promoCode, bonusAmount: p.bonusAmount }))} />

          </div>
        </section>

        <div className="promo-list">
          {promos.length === 0 && (
            <div className="empty-state">
              <p>No promo codes available yet. Check back soon!</p>
            </div>
          )}

          {promos.map((promo, idx) => (
            <article key={promo.id} className="promo-card">
              {/* Rank label */}
              <div className="promo-card__rank-label">
                Betting site #{promo.rank}
              </div>

              <div className="promo-card__inner">
                {/* LEFT: Logo + rank badge */}
                <div className="promo-card__logo-col">
                  <div
                    className="promo-card__logo-box"
                    style={{ background: promo.logoUrl ? "transparent" : promo.logoColor }}
                  >
                    <span className="promo-card__rank-badge">{promo.rank}</span>
                    {promo.logoUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={promo.logoUrl} alt={`${promo.bookmaker} logo`} className="promo-card__logo-img" />
                    ) : (
                      <span className="promo-card__logo-text">
                        {promo.logoText}
                      </span>
                    )}
                  </div>
                </div>

                {/* CENTER: Bonus info */}
                <div className="promo-card__center">
                  {promo.category && (
                    <div className="promo-card__category-header">
                      <span>🎁</span> {promo.category}
                    </div>
                  )}
                  <div className="promo-card__bonus-label">
                    {promo.bonusLabel} :
                  </div>
                  <div className="promo-card__bonus-amount">
                    {promo.bonusAmount}
                  </div>

                  {/* Trust badges */}
                  <ul className="promo-card__badges">
                    {promo.verified && (
                      <li className="badge badge--green">
                        <span>✓</span> Verified by our team
                      </li>
                    )}
                    {promo.validUntil && (
                      <li className="badge badge--blue">
                        <span>🗓</span> Valid until{" "}
                        {formatDate(promo.validUntil)}
                      </li>
                    )}
                    {promo.exclusive && (
                      <li className="badge badge--gold">
                        <span>⭐</span> Exclusive Offer
                      </li>
                    )}
                  </ul>

                  {/* Promo code copy box */}
                  <CopyButton code={promo.promoCode} />

                  {/* CTA */}
                  <a
                    href={promo.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="promo-card__cta"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    SEE THE OFFER
                  </a>

                  {/* Terms */}
                  <p className="promo-card__terms">{promo.termsText}</p>
                </div>

                {/* RIGHT: Rating */}
                <div className="promo-card__rating-col">
                  <div className="promo-card__rating-score">
                    <span className="rating-number">{promo.rating}</span>
                    <span className="rating-denom">/ 10</span>
                  </div>
                  <StarRating rating={promo.rating} />
                  <Link
                    href={`/blog`}
                    className="promo-card__review-link"
                  >
                    {promo.bookmaker} review
                  </Link>
                  {/* Tags */}
                  {promo.tags && promo.tags.length > 0 && (
                    <div className="promo-card__tags">
                      {promo.tags.map((tag) => (
                        <span key={tag} className="promo-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* SEO text block */}
        <section className="promo-seo-block">
          <div className="promo-seo-block__inner">
            <div style={{ position: "relative", width: "100%", height: "300px", borderRadius: "16px", overflow: "hidden", marginBottom: "32px", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
              <Image src="/football_promo_action.png" alt="Live Football Action" fill style={{ objectFit: "cover" }} priority />
            </div>
            <h2>How to Use a Betting Promo Code</h2>
            <p>
              A promo code (also called a bonus code or referral code) is a
              short alphanumeric string you enter during registration or your
              first deposit at an online sportsbook. In exchange, the bookmaker
              unlocks a welcome bonus — typically a deposit match, free bets, or
              a risk-free bet.
            </p>
            <h3>Step-by-step guide</h3>
            <ol>
              <li>
                <strong>Choose your bookmaker</strong> from the list above and
                click <em>SEE THE OFFER</em>.
              </li>
              <li>
                <strong>Copy the promo code</strong> using the copy button next
                to the code box.
              </li>
              <li>
                <strong>Register</strong> a new account and paste the code into
                the &quot;Promo Code&quot; or &quot;Bonus Code&quot; field.
              </li>
              <li>
                <strong>Make your first deposit</strong> meeting the minimum
                requirement shown in the offer.
              </li>
              <li>
                <strong>Enjoy your bonus</strong> — check the T&amp;Cs for
                wagering requirements before withdrawing.
              </li>
            </ol>
            <p className="promo-seo-block__disclaimer">
              ⚠️ Gambling can be addictive. Please bet responsibly. 18+ only.
              If you feel you have a gambling problem, visit{" "}
              <a
                href="https://www.begambleaware.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                BeGambleAware.org
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
