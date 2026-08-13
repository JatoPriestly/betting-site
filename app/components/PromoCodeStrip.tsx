"use client";

import { useState, useRef } from "react";
import en from "../../dictionaries/en.json";

interface PromoItem {
  id: string;
  bookmaker: string;
  promoCode: string;
  bonusAmount: string;
}

interface PromoCodeStripProps {
  promos: PromoItem[];
  /** Locale dictionary; English routes fall back to en.json. */
  dict?: any;
}

function PromoCodePill({ promo, t }: { promo: PromoItem; t: typeof en.common }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(promo.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const el = document.createElement("textarea");
      el.value = promo.promoCode;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: copied ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)",
        border: copied ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.18)",
        borderRadius: "9999px",
        padding: "8px 14px 8px 16px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        whiteSpace: "nowrap",
        flexShrink: 0,
        outline: "none",
      }}
      title={`${t.copy_hint} ${promo.promoCode}`}
    >
      {/* Bookmaker */}
      <span style={{
        fontSize: "0.7rem",
        fontWeight: 800,
        color: "#d1e8ff",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}>
        {promo.bookmaker}
      </span>

      {/* Divider */}
      <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.8rem" }}>·</span>

      {/* Code */}
      <span style={{
        fontSize: "0.85rem",
        fontWeight: 900,
        color: "#fff",
        letterSpacing: "0.12em",
        fontFamily: "monospace",
        textTransform: "uppercase",
      }}>
        {promo.promoCode}
      </span>

      {/* Copy button */}
      <span style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: copied ? "#2ecc71" : "var(--cyan)",
        color: "#fff",
        borderRadius: "99px",
        padding: "3px 10px",
        fontSize: "0.65rem",
        fontWeight: 900,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        transition: "background 0.2s",
        minWidth: "52px",
        justifyContent: "center",
      }}>
        {copied ? (
          <>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {t.copied}
          </>
        ) : (
          <>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            {t.copy}
          </>
        )}
      </span>
    </button>
  );
}

export default function PromoCodeStrip({ promos, dict }: PromoCodeStripProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const t = dict?.common ?? en.common;

  if (!promos || promos.length === 0) return null;

  // Duplicate items for seamless infinite scroll
  const doubled = [...promos, ...promos, ...promos];

  return (
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        margin: "28px 0 0",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Fade edges */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "80px",
        background: "linear-gradient(to right, var(--navy-deep), transparent)",
        zIndex: 2,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: "80px",
        background: "linear-gradient(to left, var(--navy-deep), transparent)",
        zIndex: 2,
        pointerEvents: "none",
      }} />

      {/* Scrolling track */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "12px",
          animation: `promoScroll ${Math.max(promos.length * 6, 20)}s linear infinite`,
          animationPlayState: isPaused ? "paused" : "running",
          width: "max-content",
        }}
      >
        {doubled.map((promo, i) => (
          <PromoCodePill key={`${promo.id}-${i}`} promo={promo} t={t} />
        ))}
      </div>

      <style>{`
        @keyframes promoScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.333%)); }
        }
      `}</style>
    </div>
  );
}
