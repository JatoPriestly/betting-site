import { getActivePromos } from "@/app/lib/promos";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CopyButton from "./CopyButton";

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

export default async function PromosPage() {
  const promos = await getActivePromos();

  const now = new Date();
  const monthYear = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
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
  );
}
