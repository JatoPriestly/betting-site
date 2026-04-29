import { getActivePromos } from "@/app/lib/promos";
import type { Metadata } from "next";
import Link from "next/link";
import CopyButton from "./CopyButton";
import Footer from "../../components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const titles: Record<string, string> = {
    en: "Best Betting Promo Codes 2026 | MaryaBet",
    es: "Mejores Códigos Promocionales de Apuestas 2026 | MaryaBet",
    fr: "Meilleurs Codes Promo Paris Sportifs 2026 | MaryaBet",
  };
  const descs: Record<string, string> = {
    en: "Exclusive verified promo codes from top bookmakers. Copy your code and claim your welcome bonus.",
    es: "Códigos promocionales verificados de los mejores bookmakers. Copia tu código y reclama tu bono.",
    fr: "Codes promo vérifiés des meilleurs bookmakers. Copiez votre code et réclamez votre bonus.",
  };
  return { title: titles[lang] ?? titles.en, description: descs[lang] ?? descs.en };
}

const t = {
  en: {
    heading: "Best Betting Promo Codes",
    disclaimer: "New customers only · 18+ · T&Cs apply",
    rank: "Betting site",
    verified: "Verified",
    exclusive: "Exclusive Offer",
    validUntil: "Valid until",
    seeOffer: "SEE THE OFFER",
    howTitle: "How to Use a Promo Code",
    step1: "Choose your bookmaker and click SEE THE OFFER.",
    step2: "Copy the promo code using the copy button.",
    step3: "Register, paste the code, and make your first deposit.",
    step4: "Enjoy your bonus — check T&Cs for wagering requirements.",
    responsible: "Gambling can be addictive. Bet responsibly. 18+ only.",
    noPromos: "No promo codes available yet. Check back soon!",
  },
  es: {
    heading: "Mejores Códigos Promocionales",
    disclaimer: "Solo nuevos clientes · +18 · Se aplican T&C",
    rank: "Casa de apuestas",
    verified: "Verificado",
    exclusive: "Oferta Exclusiva",
    validUntil: "Válido hasta",
    seeOffer: "VER LA OFERTA",
    howTitle: "Cómo Usar un Código Promo",
    step1: "Elige tu bookmaker y haz clic en VER LA OFERTA.",
    step2: "Copia el código promocional con el botón de copiar.",
    step3: "Regístrate, pega el código y realiza tu primer depósito.",
    step4: "Disfruta tu bono — revisa las condiciones de apuesta.",
    responsible: "El juego puede ser adictivo. Apuesta con responsabilidad. Solo +18.",
    noPromos: "Aún no hay códigos disponibles. ¡Vuelve pronto!",
  },
  fr: {
    heading: "Meilleurs Codes Promo Paris Sportifs",
    disclaimer: "Nouveaux clients uniquement · 18+ · CGU applicables",
    rank: "Site de paris",
    verified: "Vérifié",
    exclusive: "Offre Exclusive",
    validUntil: "Valable jusqu'au",
    seeOffer: "VOIR L'OFFRE",
    howTitle: "Comment Utiliser un Code Promo",
    step1: "Choisissez votre bookmaker et cliquez sur VOIR L'OFFRE.",
    step2: "Copiez le code promo avec le bouton de copie.",
    step3: "Inscrivez-vous, collez le code et effectuez votre premier dépôt.",
    step4: "Profitez de votre bonus — vérifiez les conditions de mise.",
    responsible: "Les jeux peuvent être addictifs. Pariez de façon responsable. 18+ uniquement.",
    noPromos: "Aucun code disponible pour l'instant. Revenez bientôt !",
  },
} as const;

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(
    lang === "es" ? "es-ES" : lang === "fr" ? "fr-FR" : "en-GB",
    { month: "long", year: "numeric" }
  );
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating / 2);
  const half = rating / 2 - full >= 0.5;
  return (
    <div style={{ display: "flex", gap: 3 }} aria-label={`${rating}/10`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < full || (i === full && half) ? "#fff" : "#222", fontSize: "0.9rem" }}>
          ★
        </span>
      ))}
    </div>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pp-root { min-height: 100vh; background: #000; color: #fff; font-family: 'Inter', system-ui, sans-serif; padding-top: 80px; }

  /* ── Hero ── */
  .pp-hero { position: relative; overflow: hidden; background: radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06) 0%, #000 60%); border-bottom: 1px solid #111; padding: 80px 24px 60px; text-align: center; }
  .pp-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }
  .pp-breadcrumb { position: relative; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.78rem; color: #555; margin-bottom: 28px; }
  .pp-breadcrumb a { color: #555; text-decoration: none; transition: color 0.2s; }
  .pp-breadcrumb a:hover { color: #fff; }
  .pp-hero h1 { position: relative; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -0.03em; text-transform: uppercase; color: #fff; margin-bottom: 16px; line-height: 1.1; }
  .pp-hero h1 em { font-style: normal; text-shadow: 0 0 40px rgba(255,255,255,0.5); }
  .pp-disclaimer { position: relative; font-size: 0.78rem; color: #444; font-weight: 500; border: 1px solid #1a1a1a; display: inline-block; padding: 6px 16px; border-radius: 99px; margin-top: 8px; }

  /* ── List ── */
  .pp-list { max-width: 1000px; margin: 0 auto; padding: 48px 24px; display: flex; flex-direction: column; gap: 0; }

  /* ── Card ── */
  .pp-card { background: #000; border: 1px solid #111; border-bottom: none; transition: background 0.15s; }
  .pp-card:last-child { border-bottom: 1px solid #111; }
  .pp-card:hover { background: #050505; }
  .pp-card__rank-bar { background: #050505; border-bottom: 1px solid #111; padding: 8px 28px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #555; }
  .pp-card__body { display: grid; grid-template-columns: 140px 1fr 180px; align-items: stretch; }

  /* Logo */
  .pp-card__logo { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px 16px; border-right: 1px solid #111; gap: 8px; }
  .pp-card__logo-box { width: 80px; height: 80px; border-radius: 10px; border: 1px solid #222; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 900; color: #fff; overflow: hidden; text-align: center; line-height: 1.2; padding: 8px; }
  .pp-card__logo-img { width: 100%; height: 100%; object-fit: contain; }
  .pp-card__rank-num { font-size: 0.7rem; font-weight: 700; color: #333; }

  /* Center */
  .pp-card__center { padding: 28px; display: flex; flex-direction: column; gap: 12px; }
  .pp-card__category { font-size: 0.68rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; color: #444; }
  .pp-card__bonus-label { font-size: 0.8rem; color: #555; }
  .pp-card__bonus-amount { font-size: 1.6rem; font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1; text-transform: uppercase; }
  .pp-card__badges { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; padding: 0; }
  .pp-badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px; border-radius: 4px; font-size: 0.68rem; font-weight: 700; border: 1px solid #222; color: #888; background: #0a0a0a; }
  .pp-badge--green { color: #fff; border-color: #2a2a2a; }
  .pp-badge--gold  { color: #aaa; border-color: #2a2a2a; }
  .pp-badge--blue  { color: #666; border-color: #1a1a1a; }

  /* CopyButton styles */
  .promo-code-box { display: flex; align-items: center; background: #0a0a0a; border: 1.5px dashed #2a2a2a; border-radius: 6px; overflow: hidden; cursor: pointer; transition: border-color 0.2s, background 0.2s; max-width: 340px; }
  .promo-code-box:hover { border-color: #fff; background: #111; }
  .promo-code-box__coupon { flex: 1; padding: 10px 14px; }
  .promo-code-box__label { display: block; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #444; margin-bottom: 2px; }
  .promo-code-box__value { font-size: 1rem; font-weight: 900; color: #fff; letter-spacing: 0.12em; font-family: monospace; }
  .promo-code-box__btn { display: flex; align-items: center; gap: 5px; padding: 10px 16px; background: #fff; border: none; border-left: 1px solid #222; color: #000; font-size: 0.78rem; font-weight: 900; cursor: pointer; font-family: inherit; transition: background 0.2s; white-space: nowrap; letter-spacing: 0.05em; }
  .promo-code-box__btn:hover { background: #e0e0e0; }

  /* Right col */
  .pp-card__right { padding: 28px 24px; display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; gap: 12px; border-left: 1px solid #111; }
  .pp-card__rating { text-align: right; }
  .pp-card__rating-num { font-size: 2.2rem; font-weight: 900; color: #fff; letter-spacing: -0.05em; line-height: 1; }
  .pp-card__rating-denom { font-size: 0.9rem; color: #333; }
  .pp-card__cta { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 12px 16px; background: #fff; color: #000; font-size: 0.75rem; font-weight: 900; text-decoration: none; border-radius: 6px; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: 0 4px 20px rgba(255,255,255,0.08); }
  .pp-card__cta:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(255,255,255,0.15); letter-spacing: 0.12em; }
  .pp-card__terms { font-size: 0.65rem; color: #2a2a2a; text-align: right; line-height: 1.4; }
  .pp-card__tags { display: flex; flex-wrap: wrap; gap: 4px; justify-content: flex-end; }
  .pp-tag { background: #0a0a0a; color: #444; padding: 2px 8px; border: 1px solid #1a1a1a; border-radius: 4px; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }

  /* SEO block */
  .pp-seo { max-width: 1000px; margin: 0 auto; padding: 0 24px 80px; }
  .pp-seo__card { background: #050505; border: 1px solid #111; padding: 48px; }
  .pp-seo h2 { font-size: 1.6rem; font-weight: 900; color: #fff; margin-bottom: 16px; text-transform: uppercase; letter-spacing: -0.02em; }
  .pp-seo p { color: #555; line-height: 1.7; margin-bottom: 20px; font-size: 0.9rem; }
  .pp-seo h3 { font-size: 0.85rem; font-weight: 800; color: #fff; margin: 24px 0 12px; text-transform: uppercase; letter-spacing: 0.08em; }
  .pp-seo ol { padding-left: 20px; display: flex; flex-direction: column; gap: 10px; }
  .pp-seo li { color: #555; line-height: 1.6; font-size: 0.9rem; }
  .pp-seo li strong { color: #fff; }
  .pp-seo__warn { margin-top: 28px; padding: 16px 20px; border: 1px solid #1a1a1a; font-size: 0.8rem; color: #444; line-height: 1.6; }
  .pp-seo__warn a { color: #888; text-decoration: underline; }
  .pp-seo__warn a:hover { color: #fff; }

  .pp-empty { text-align: center; padding: 80px 0; color: #333; font-size: 1rem; }

  @media (max-width: 700px) {
    .pp-card__body { grid-template-columns: 1fr; }
    .pp-card__logo { border-right: none; border-bottom: 1px solid #111; flex-direction: row; justify-content: flex-start; padding: 16px 20px; }
    .pp-card__right { border-left: none; border-top: 1px solid #111; align-items: flex-start; }
    .pp-card__terms { text-align: left; }
    .pp-card__tags { justify-content: flex-start; }
    .pp-seo__card { padding: 24px; }
  }
`;

export default async function PromosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = t[(lang as keyof typeof t)] ?? t.en;
  const promos = await getActivePromos();
  const monthYear = new Date().toLocaleDateString(

    lang === "es" ? "es-ES" : lang === "fr" ? "fr-FR" : "en-GB",
    { month: "long", year: "numeric" }
  );

  return (
    <>
      <style>{CSS}</style>

      <div className="pp-root">
        {/* Hero */}
        <section className="pp-hero">
          <div className="pp-hero-grid" />
          <nav className="pp-breadcrumb">
            <Link href={`/${lang}`}>Home</Link>
            <span>›</span>
            <span>Promos</span>
          </nav>
          <h1>
            {dict.heading} — <em>{monthYear}</em>
          </h1>
          <p className="pp-disclaimer">{dict.disclaimer}</p>
        </section>

        {/* Promo list */}
        <div className="pp-list">
          {promos.length === 0 ? (
            <div className="pp-empty">{dict.noPromos}</div>
          ) : (
            promos.map((promo) => (
              <article key={promo.id} className="pp-card">
                <div className="pp-card__rank-bar">
                  {dict.rank} #{promo.rank}
                </div>
                <div className="pp-card__body">
                  {/* Logo */}
                  <div className="pp-card__logo">
                    <div
                      className="pp-card__logo-box"
                      style={{ background: promo.logoUrl ? "transparent" : promo.logoColor }}
                    >
                      {promo.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={promo.logoUrl} alt={promo.bookmaker} className="pp-card__logo-img" />
                      ) : (
                        promo.logoText
                      )}
                    </div>
                    <span className="pp-card__rank-num">#{promo.rank}</span>
                  </div>

                  {/* Center */}
                  <div className="pp-card__center">
                    {promo.category && (
                      <div className="pp-card__category">🎁 {promo.category}</div>
                    )}
                    <div className="pp-card__bonus-label">{promo.bonusLabel}:</div>
                    <div className="pp-card__bonus-amount">{promo.bonusAmount}</div>

                    <ul className="pp-card__badges">
                      {promo.verified && (
                        <li className="pp-badge pp-badge--green">✓ {dict.verified}</li>
                      )}
                      {promo.exclusive && (
                        <li className="pp-badge pp-badge--gold">⭐ {dict.exclusive}</li>
                      )}
                      {promo.validUntil && (
                        <li className="pp-badge pp-badge--blue">
                          🗓 {dict.validUntil} {formatDate(promo.validUntil, lang)}
                        </li>
                      )}
                    </ul>

                    <CopyButton code={promo.promoCode} />
                  </div>

                  {/* Right */}
                  <div className="pp-card__right">
                    <div className="pp-card__rating">
                      <div>
                        <span className="pp-card__rating-num">{promo.rating}</span>
                        <span className="pp-card__rating-denom">/10</span>
                      </div>
                      <StarRating rating={promo.rating} />
                    </div>

                    <a
                      href={promo.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="pp-card__cta"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      {dict.seeOffer}
                    </a>

                    <p className="pp-card__terms">{promo.termsText}</p>

                    {promo.tags && promo.tags.length > 0 && (
                      <div className="pp-card__tags">
                        {promo.tags.map((tag) => (
                          <span key={tag} className="pp-tag">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* SEO block */}
        <section className="pp-seo">
          <div className="pp-seo__card">
            <h2>{dict.howTitle}</h2>
            <p>
              A promo code is a short alphanumeric string entered during registration
              at an online bookmaker to unlock a welcome bonus — typically a deposit
              match, free bets, or a risk-free wager.
            </p>
            <h3>Step-by-step</h3>
            <ol>
              <li><strong>Step 1.</strong> {dict.step1}</li>
              <li><strong>Step 2.</strong> {dict.step2}</li>
              <li><strong>Step 3.</strong> {dict.step3}</li>
              <li><strong>Step 4.</strong> {dict.step4}</li>
            </ol>
            <div className="pp-seo__warn">
              ⚠️ {dict.responsible}{" "}
              <a href="https://www.begambleaware.org" target="_blank" rel="noopener noreferrer">
                BeGambleAware.org
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
