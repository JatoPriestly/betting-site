import { ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { whatsappUrl } from "../lib/contact";
import en from "../../dictionaries/en.json";

const CSS = `
  .tpb-section {
    position: relative;
    padding: 72px 24px;
    background:
      radial-gradient(ellipse 60% 70% at 20% 50%, rgba(255, 213, 79, 0.10) 0%, transparent 60%),
      radial-gradient(ellipse 70% 80% at 85% 40%, rgba(47, 165, 232, 0.18) 0%, transparent 60%),
      linear-gradient(180deg, var(--navy-deep) 0%, var(--navy) 100%);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    overflow: hidden;
  }
  .tpb-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 75%);
    pointer-events: none;
  }
  .tpb-inner {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.35fr 1fr;
    gap: 56px;
    align-items: center;
  }
  .tpb-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 213, 79, 0.12);
    border: 1px solid rgba(255, 213, 79, 0.45);
    color: var(--gold);
    border-radius: 9999px;
    padding: 7px 18px;
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .tpb-badge-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--gold);
    box-shadow: 0 0 8px var(--gold);
    animation: tpbPulse 1.8s ease-in-out infinite;
  }
  @keyframes tpbPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.45; transform: scale(1.35); }
  }
  .tpb-title {
    font-size: clamp(1.9rem, 4vw, 3rem);
    font-weight: 900;
    line-height: 1.1;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 18px;
  }
  .tpb-title span {
    font-family: 'Space Mono', monospace;
    background: linear-gradient(135deg, var(--gold), #ffb300);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 24px rgba(255, 213, 79, 0.4));
    letter-spacing: 0.04em;
  }
  .tpb-desc {
    color: var(--text-secondary);
    font-size: 1.08rem;
    line-height: 1.75;
    max-width: 620px;
    margin-bottom: 28px;
  }
  .tpb-points {
    list-style: none;
    padding: 0;
    margin: 0 0 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .tpb-point {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text-secondary);
    font-size: 0.98rem;
    font-weight: 500;
  }
  .tpb-check {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(47, 165, 232, 0.16);
    border: 1px solid rgba(47, 165, 232, 0.5);
    color: var(--cyan-glow);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.72rem;
    font-weight: 900;
  }
  .tpb-actions {
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .tpb-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 18px 40px;
    background: linear-gradient(135deg, var(--cyan) 0%, var(--electric) 100%);
    color: #fff;
    font-weight: 800;
    font-size: 1rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    border-radius: 14px;
    text-decoration: none;
    box-shadow: 0 8px 32px rgba(47, 165, 232, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .tpb-cta:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 18px 44px rgba(47, 165, 232, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
  .tpb-note {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--text-muted);
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.04em;
  }
  .tpb-visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 260px;
  }
  .tpb-visual-glow {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 213, 79, 0.22) 0%, transparent 70%);
    animation: tpbFloat 6s ease-in-out infinite;
  }
  @keyframes tpbFloat {
    0%, 100% { transform: scale(1) translateY(0); opacity: 0.75; }
    50% { transform: scale(1.12) translateY(-10px); opacity: 1; }
  }
  .tpb-visual img {
    position: relative;
    width: 100%;
    max-width: 320px;
    height: auto;
    object-fit: contain;
    /* The source art has its own dark background, so frame it as a card
       instead of letting a hard rectangle sit on the blue band. */
    border-radius: 20px;
    border: 1px solid var(--border);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 900px) {
    .tpb-section { padding: 56px 20px; }
    .tpb-inner { grid-template-columns: 1fr; gap: 32px; text-align: center; }
    .tpb-desc { margin-left: auto; margin-right: auto; }
    /* Keep the list block-centred but its lines flush-left, so the
       ticks form a single column instead of a ragged stack. */
    .tpb-points {
      align-items: flex-start;
      width: fit-content;
      max-width: 100%;
      margin-left: auto;
      margin-right: auto;
    }
    .tpb-point { text-align: left; }
    .tpb-actions { justify-content: center; }
    .tpb-visual { order: -1; min-height: 0; }
    .tpb-visual img { max-width: 210px; }
    .tpb-cta { width: 100%; justify-content: center; }
  }
`;

/**
 * Always-visible TouchPoint payouts band. Rendered high on the home page so the
 * payment route does not depend on the dismissible system-ad modal.
 */
export default function TouchPointBand({ dict }: { dict?: any }) {
  const t = dict?.touchpoint ?? en.touchpoint;

  return (
    <section className="tpb-section" aria-labelledby="tpb-title">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="tpb-inner">
        <div>
          <div className="tpb-badge">
            <span className="tpb-badge-dot" />
            {t.badge}
          </div>

          <h2 className="tpb-title" id="tpb-title">
            <span>{t.title_brand}</span> {t.title_rest}
          </h2>

          <p className="tpb-desc">{t.desc}</p>

          <ul className="tpb-points">
            <li className="tpb-point">
              <span className="tpb-check">✓</span>
              {t.point1}
            </li>
            <li className="tpb-point">
              <span className="tpb-check">✓</span>
              {t.point2}
            </li>
            <li className="tpb-point">
              <span className="tpb-check">✓</span>
              {t.point3}
            </li>
          </ul>

          <div className="tpb-actions">
            <a
              href={whatsappUrl(t.prefill)}
              target="_blank"
              rel="noopener noreferrer"
              className="tpb-cta"
            >
              <Zap size={18} />
              {t.cta}
              <ArrowRight size={18} />
            </a>
            <span className="tpb-note">
              <ShieldCheck size={15} />
              {t.note}
            </span>
          </div>
        </div>

        <div className="tpb-visual">
          <div className="tpb-visual-glow" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero-coins.png" alt="" />
        </div>
      </div>
    </section>
  );
}
