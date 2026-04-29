import { notFound } from "next/navigation";
import AdminLoginForm from "./LoginForm";

const SECRET_PATH = process.env.ADMIN_SECRET_PATH ?? "";

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ secret: string }>;
}) {
  const { secret } = await params;

  if (secret !== SECRET_PATH) {
    notFound();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .mb-login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #030303;
          font-family: 'Inter', system-ui, sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Animated grid */
        .mb-login-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%);
        }

        /* Glowing orbs */
        .mb-login-orb-1 {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%);
          top: 30%;
          left: 20%;
          filter: blur(80px);
          animation: orb-float 8s ease-in-out infinite alternate;
        }
        .mb-login-orb-2 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%);
          bottom: 20%;
          right: 20%;
          filter: blur(80px);
          animation: orb-float 10s ease-in-out infinite alternate-reverse;
        }

        @keyframes orb-float {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(30px, -20px) scale(1.1); }
        }

        .mb-login-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          margin: 20px;
          background: rgba(12, 12, 12, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 28px;
          padding: 52px 44px;
          box-shadow:
            0 0 0 1px rgba(212,175,55,0.06),
            0 40px 80px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.06);
          animation: card-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes card-in {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .mb-login-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 36px;
        }

        .mb-login-logo-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #d4af37 0%, #f5d060 50%, #b8941a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          box-shadow: 0 8px 24px rgba(212,175,55,0.35);
          flex-shrink: 0;
        }

        .mb-login-brand {
          text-align: left;
        }

        .mb-login-brand-name {
          font-size: 1.4rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .mb-login-brand-name span {
          color: #d4af37;
        }

        .mb-login-brand-sub {
          font-size: 0.72rem;
          font-weight: 600;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-top: 3px;
        }

        .mb-login-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          margin-bottom: 32px;
        }

        .mb-login-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
          text-align: center;
        }

        .mb-login-subtitle {
          font-size: 0.875rem;
          color: #555;
          text-align: center;
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .mb-login-back {
          display: block;
          text-align: center;
          margin-top: 28px;
          color: #444;
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 600;
          transition: color 0.2s;
        }
        .mb-login-back:hover { color: #888; }

        .mb-login-lock {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 24px;
          font-size: 0.72rem;
          color: #333;
          font-weight: 500;
        }
      `}</style>

      <div className="mb-login-root">
        <div className="mb-login-grid" />
        <div className="mb-login-orb-1" />
        <div className="mb-login-orb-2" />

        <div className="mb-login-card">
          <div className="mb-login-logo">
            <div className="mb-login-logo-icon">🎲</div>
            <div className="mb-login-brand">
              <div className="mb-login-brand-name">
                Marya<span>Bet</span>
              </div>
              <div className="mb-login-brand-sub">Admin Portal</div>
            </div>
          </div>

          <div className="mb-login-divider" />

          <h1 className="mb-login-title">Secure Access</h1>
          <p className="mb-login-subtitle">
            Authorized personnel only. Enter your PIN to continue.
          </p>

          <AdminLoginForm />

          <div className="mb-login-lock">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            256-bit encrypted session
          </div>

          <a href="/en/blog" className="mb-login-back">
            ← Return to MaryaBet
          </a>
        </div>
      </div>
    </>
  );
}
