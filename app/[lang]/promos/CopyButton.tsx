"use client";

import { useState } from "react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback — select text manually
    }
  }

  return (
    <div
      onClick={handleCopy}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleCopy()}
      className="promo-code-box"
    >
      <div className="promo-code-box__coupon">
        <span className="promo-code-box__label">Promo Code</span>
        <span className="promo-code-box__value">{code}</span>
      </div>
      <button className="promo-code-box__btn" type="button" aria-label="Copy promo code">
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
}
