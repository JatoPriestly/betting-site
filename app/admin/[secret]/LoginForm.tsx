"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });
    setLoading(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Incorrect PIN. Please try again.");
      setPin("");
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <style>{`
        .mb-pin-input {
          width: 100%;
          padding: 16px 20px;
          background: rgba(0,0,0,0.5);
          border: 1.5px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          color: #fff;
          font-size: 1.05rem;
          letter-spacing: 0.25em;
          text-align: center;
          font-family: 'Inter', monospace;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-text-security: disc;
        }
        .mb-pin-input::placeholder {
          letter-spacing: 0.05em;
          color: #333;
          -webkit-text-security: none;
        }
        .mb-pin-input:focus {
          border-color: #d4af37;
          box-shadow: 0 0 0 3px rgba(212,175,55,0.15), 0 0 20px rgba(212,175,55,0.08);
        }

        .mb-pin-error {
          background: rgba(230,57,70,0.08);
          border: 1px solid rgba(230,57,70,0.25);
          border-radius: 10px;
          padding: 12px 16px;
          color: #ff6b72;
          font-size: 0.83rem;
          font-weight: 600;
          text-align: center;
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }

        @keyframes shake {
          10%, 90% { transform: translateX(-1px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-3px); }
          40%, 60% { transform: translateX(3px); }
        }

        .mb-pin-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #d4af37 0%, #f5d060 50%, #b8941a 100%);
          color: #000;
          border: none;
          border-radius: 14px;
          font-size: 0.95rem;
          font-weight: 800;
          cursor: pointer;
          letter-spacing: 0.03em;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(212,175,55,0.25);
        }
        .mb-pin-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
          pointer-events: none;
        }
        .mb-pin-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 12px 32px rgba(212,175,55,0.4);
        }
        .mb-pin-btn:active:not(:disabled) {
          transform: translateY(0) scale(0.98);
        }
        .mb-pin-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .mb-pin-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2.5px solid rgba(0,0,0,0.3);
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "14px" }}
      >
        <input
          ref={inputRef}
          id="admin-pin"
          type="password"
          className="mb-pin-input"
          placeholder="Enter access PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          autoComplete="current-password"
          required
        />

        {error && <div className="mb-pin-error">{error}</div>}

        <button
          type="submit"
          className="mb-pin-btn"
          disabled={loading || pin.length === 0}
        >
          {loading ? (
            <>
              <span className="mb-pin-spinner" />
              Verifying…
            </>
          ) : (
            "Access Portal"
          )}
        </button>
      </form>
    </>
  );
}
