import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WorldMap from "./components/WorldMap";
import { getActivePromos } from "./lib/promos";
import CopyButton from "./promos/CopyButton";
import { User, Trophy, Clock, ShieldCheck, Gift, CheckCircle, Calendar, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Marya Bet | The Ultimate Betting Platform",
  description: "Enjoy competitive odds, in-depth match analysis, live betting options, and fast, secure payouts.",
};

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function Home() {
  const promos = getActivePromos();

  return (
    <div className="home-wrapper">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero__content">
          <div className="home-hero__social-proof">
            <span className="social-proof__label">Our Users</span>
            <div className="social-proof__avatars">
              <div className="avatar bg-blue-500"><User size={14} color="#fff" /></div>
              <div className="avatar bg-pink-500"><User size={14} color="#fff" /></div>
              <div className="avatar bg-green-500"><User size={14} color="#fff" /></div>
            </div>
            <span className="social-proof__text">Trusted by 24,000+ people</span>
          </div>

          <h1 className="home-hero__title">
            The Ultimate<br />
            Betting Promo Code<br />
            Sourcing Platform
          </h1>
          <p className="home-hero__desc">
            Unlock exclusive welcome bonuses, premium free bets, and the highest-value promo codes across the world&apos;s most trusted sportsbooks. Maximize your edge today.
          </p>

          <div className="home-hero__actions">
            <Link href="#promos" className="home-btn home-btn--primary">
              Get Started
            </Link>
            <Link href="/blog" className="home-btn home-btn--secondary">
              More Features
            </Link>
          </div>
        </div>

        <div className="home-hero__image-wrapper">
          <Image 
            src="/hero_stadium_3d_1774303973722.png" 
            alt="3D Football Stadium" 
            width={700}
            height={700}
            className="home-hero__image"
            priority
          />
        </div>
      </section>

      {/* Map Section */}
      <section className="home-map-section">
        <h2 className="home-map-title">Global Availability</h2>
        <p className="home-map-desc">
          Our partner sportsbooks cover major global territories. See below for countries 
          where the DICEVIP promotional code applies universally for all top platforms 
          including Stake, 1xBet, and Betway.
        </p>
        <WorldMap />
      </section>

      {/* Active Promos Section */}
      <section id="promos" className="home-promos-section">
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 className="home-map-title">Top Exclusive Offers</h2>
          <p className="home-map-desc">Claim your welcome bonuses below using our verified codes.</p>
        </div>
        <div className="promo-list">
          {promos.map((promo) => (
            <article key={promo.id} className="promo-card">
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
                    <div className="promo-card__category-header" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Gift size={14} className="text-[var(--lime)]" /> {promo.category}
                    </div>
                  )}
                  <div className="promo-card__bonus-label">
                    {promo.bonusLabel} :
                  </div>
                  <div className="promo-card__bonus-amount" style={{ color: "var(--lime)" }}>
                    {promo.bonusAmount}
                  </div>

                  {/* Trust badges */}
                  <ul className="promo-card__badges">
                    {promo.verified && (
                      <li className="badge badge--green" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <CheckCircle size={14} /> Verified by our team
                      </li>
                    )}
                    {promo.validUntil && (
                      <li className="badge badge--blue" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Calendar size={14} /> Valid until{" "}
                        {formatDate(promo.validUntil)}
                      </li>
                    )}
                    {promo.exclusive && (
                      <li className="badge badge--gold" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Star size={14} fill="currentColor" /> Exclusive Offer
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
                    style={{ background: "var(--lime)", color: "#000", boxShadow: "0 4px 12px rgba(163,230,53,0.25)" }}
                  >
                    SEE THE OFFER
                  </a>
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
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="home-feature-card">
          <div className="home-feature-icon"><Trophy size={20} color="var(--lime)" /></div>
          <h3 className="home-feature-title">Global Football Coverage</h3>
          <p className="home-feature-desc">
            Bet on top football leagues worldwide, from major 
            international tournaments to local championships.
          </p>
        </div>

        <div className="home-feature-card">
          <div className="home-feature-icon"><Clock size={20} color="var(--lime)" /></div>
          <h3 className="home-feature-title">24/7 Live Betting</h3>
          <p className="home-feature-desc">
            Place bets anytime with real-time odds, live match 
            updates, and instant market changes throughout.
          </p>
        </div>

        <div className="home-feature-card">
          <div className="home-feature-icon"><ShieldCheck size={20} color="var(--lime)" /></div>
          <h3 className="home-feature-title">Secure & Fast Payments</h3>
          <p className="home-feature-desc">
            Enjoy safe transactions, quick deposits, and instant 
            withdrawals with trusted and encrypted payment.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
