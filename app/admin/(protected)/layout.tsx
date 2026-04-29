import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  FileText,
  PlusSquare,
  Ticket,
  PlusCircle,
  Globe,
  LogOut,
  Zap,
  ChevronRight,
} from "lucide-react";
import { verifySessionToken, SESSION_COOKIE } from "@/app/lib/adminSession";

const SECRET_PATH = process.env.ADMIN_SECRET_PATH ?? "";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value ?? "";
  const authed = verifySessionToken(token);

  if (!authed) {
    redirect(`/admin/${SECRET_PATH}`);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --mb-bg:           #030303;
          --mb-surface:      #0a0a0a;
          --mb-surface-2:    #0f0f0f;
          --mb-border:       rgba(255,255,255,0.06);
          --mb-border-hover: rgba(255,255,255,0.12);
          --mb-text:         #e8e8e8;
          --mb-muted:        #4a4a4a;
          --mb-muted-2:      #2a2a2a;
          --mb-gold:         #d4af37;
          --mb-gold-light:   #f5d060;
          --mb-gold-dark:    #b8941a;
          --mb-red:          #e63946;
          --mb-red-hover:    #ff4d57;
          --mb-green:        #22c55e;
          --mb-amber:        #f59e0b;
          --mb-sidebar-w:    260px;
        }

        body {
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--mb-bg);
          color: var(--mb-text);
        }

        /* ── Shell ─────────────────────────────────────────── */
        .mb-shell {
          display: flex;
          min-height: 100vh;
          background: var(--mb-bg);
        }

        /* ── Sidebar ───────────────────────────────────────── */
        .mb-sidebar {
          width: var(--mb-sidebar-w);
          flex-shrink: 0;
          background: var(--mb-surface);
          border-right: 1px solid var(--mb-border);
          display: flex;
          flex-direction: column;
          padding: 0;
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          overflow-y: auto;
          z-index: 50;
        }

        .mb-sidebar-brand {
          padding: 24px 20px 20px;
          border-bottom: 1px solid var(--mb-border);
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .mb-sidebar-brand-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--mb-gold) 0%, var(--mb-gold-light) 50%, var(--mb-gold-dark) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(212,175,55,0.3);
        }

        .mb-sidebar-brand-text {
          line-height: 1;
        }

        .mb-sidebar-brand-name {
          font-size: 1.05rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .mb-sidebar-brand-name em {
          color: var(--mb-gold);
          font-style: normal;
        }

        .mb-sidebar-brand-sub {
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--mb-muted);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-top: 3px;
        }

        /* Nav */
        .mb-nav {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .mb-nav-section {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--mb-muted);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 16px 10px 6px;
        }

        .mb-nav-section:first-child {
          padding-top: 4px;
        }

        .mb-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          color: var(--mb-muted);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.15s ease;
          position: relative;
        }

        .mb-nav-link:hover {
          background: rgba(255,255,255,0.04);
          color: var(--mb-text);
        }

        .mb-nav-link:hover .mb-nav-chevron {
          opacity: 1;
          transform: translateX(0);
        }

        .mb-nav-link.active {
          background: rgba(212,175,55,0.08);
          color: var(--mb-gold);
          border: 1px solid rgba(212,175,55,0.12);
        }

        .mb-nav-chevron {
          margin-left: auto;
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.15s ease;
          color: var(--mb-muted);
        }

        /* Bottom area */
        .mb-sidebar-footer {
          padding: 12px;
          border-top: 1px solid var(--mb-border);
        }

        .mb-logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          background: none;
          border: none;
          color: var(--mb-muted);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: inherit;
        }

        .mb-logout-btn:hover {
          background: rgba(230,57,70,0.08);
          color: var(--mb-red);
        }

        .mb-view-site-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 10px;
          color: var(--mb-muted);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.15s ease;
          margin-bottom: 4px;
        }

        .mb-view-site-link:hover {
          background: rgba(255,255,255,0.04);
          color: var(--mb-text);
        }

        /* ── Main ──────────────────────────────────────────── */
        .mb-main {
          margin-left: var(--mb-sidebar-w);
          flex: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .mb-topbar {
          height: 60px;
          background: var(--mb-surface);
          border-bottom: 1px solid var(--mb-border);
          display: flex;
          align-items: center;
          padding: 0 32px;
          gap: 12px;
          position: sticky;
          top: 0;
          z-index: 40;
        }

        .mb-topbar-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--mb-green);
          box-shadow: 0 0 8px rgba(34,197,94,0.6);
          flex-shrink: 0;
        }

        .mb-topbar-status {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--mb-muted);
        }

        .mb-topbar-divider {
          width: 1px;
          height: 20px;
          background: var(--mb-border);
          margin: 0 4px;
        }

        .mb-topbar-time {
          font-size: 0.78rem;
          color: var(--mb-muted);
          margin-left: auto;
          font-variant-numeric: tabular-nums;
        }

        .mb-content {
          flex: 1;
          padding: 36px 40px;
          max-width: 1280px;
          width: 100%;
        }

        /* ── Page ──────────────────────────────────────────── */
        .admin-page {}

        .admin-page__header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 36px;
          gap: 16px;
        }

        .admin-page__title {
          font-size: 1.8rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        /* ── Buttons ───────────────────────────────────────── */
        .admin-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, var(--mb-gold) 0%, var(--mb-gold-light) 50%, var(--mb-gold-dark) 100%);
          color: #000;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 800;
          font-size: 0.875rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(212,175,55,0.25);
          white-space: nowrap;
          letter-spacing: 0.01em;
        }

        .admin-btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(212,175,55,0.35);
        }

        .admin-btn-primary:active {
          transform: translateY(0) scale(0.97);
        }

        .admin-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          color: var(--mb-text);
          border: 1px solid var(--mb-border);
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .admin-btn-secondary:hover {
          background: rgba(255,255,255,0.04);
          border-color: var(--mb-border-hover);
        }

        /* ── Table ─────────────────────────────────────────── */
        .admin-table-wrapper {
          background: var(--mb-surface);
          border: 1px solid var(--mb-border);
          border-radius: 16px;
          overflow: hidden;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-table thead {
          background: rgba(255,255,255,0.02);
        }

        .admin-table th {
          color: var(--mb-muted);
          font-weight: 700;
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 14px 20px;
          border-bottom: 1px solid var(--mb-border);
        }

        .admin-table td {
          padding: 16px 20px;
          border-bottom: 1px solid var(--mb-border);
          font-size: 0.9rem;
          vertical-align: middle;
        }

        .admin-table tbody tr:last-child td {
          border-bottom: none;
        }

        .admin-table tbody tr {
          transition: background 0.1s ease;
        }

        .admin-table tbody tr:hover {
          background: rgba(255,255,255,0.02);
        }

        .admin-table__title-link {
          color: #fff;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.15s;
        }

        .admin-table__title-link:hover {
          color: var(--mb-gold);
        }

        .admin-badge {
          background: rgba(212,175,55,0.1);
          color: var(--mb-gold);
          border: 1px solid rgba(212,175,55,0.2);
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        .admin-table__actions {
          display: flex;
          gap: 6px;
        }

        .admin-btn-edit {
          background: rgba(255,255,255,0.06);
          color: var(--mb-text);
          border: 1px solid var(--mb-border);
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: inherit;
        }

        .admin-btn-edit:hover {
          background: rgba(255,255,255,0.1);
          border-color: var(--mb-border-hover);
        }

        .admin-btn-delete {
          background: rgba(230,57,70,0.08);
          color: var(--mb-red);
          border: 1px solid rgba(230,57,70,0.15);
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: inherit;
        }

        .admin-btn-delete:hover {
          background: rgba(230,57,70,0.15);
          border-color: rgba(230,57,70,0.3);
        }

        .admin-btn-delete:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* ── States ────────────────────────────────────────── */
        .admin-loading {
          padding: 80px 0;
          text-align: center;
          color: var(--mb-muted);
          font-size: 0.9rem;
        }

        .admin-empty {
          padding: 80px 0;
          text-align: center;
          color: var(--mb-muted);
        }

        .admin-empty p {
          margin-bottom: 16px;
          font-size: 1rem;
        }

        /* ── Forms ─────────────────────────────────────────── */
        .post-form__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-field--full { grid-column: 1 / -1; }

        .form-field label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--mb-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .form-field__hint {
          font-weight: 500;
          font-size: 0.75rem;
          color: var(--mb-muted-2);
          text-transform: none;
          letter-spacing: 0;
        }

        .form-field input,
        .form-field select,
        .form-field textarea {
          background: rgba(0,0,0,0.4);
          border: 1.5px solid var(--mb-border);
          color: #fff;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 0.9rem;
          font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: var(--mb-gold);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.1);
        }

        .form-field select option {
          background: #111;
        }

        .input-readonly {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .form-section-header {
          grid-column: 1 / -1;
          font-size: 1rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.01em;
          margin-top: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--mb-border);
        }

        .form-field__counter {
          font-size: 0.72rem;
          color: var(--mb-muted);
          text-align: right;
        }

        .cover-preview {
          margin-top: 10px;
          max-width: 280px;
          border-radius: 10px;
          border: 1px solid var(--mb-border);
        }

        .post-form__actions {
          display: flex;
          gap: 12px;
          align-items: center;
          padding-top: 24px;
          border-top: 1px solid var(--mb-border);
        }

        .form-error {
          color: #ff6b72;
          background: rgba(230,57,70,0.08);
          border: 1px solid rgba(230,57,70,0.2);
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .form-success {
          color: var(--mb-green);
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          padding: 12px 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-weight: 600;
          font-size: 0.875rem;
        }

        /* ── Stat cards ────────────────────────────────────── */
        .mb-stat-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .mb-stat-card {
          background: var(--mb-surface);
          border: 1px solid var(--mb-border);
          border-radius: 14px;
          padding: 20px;
          transition: border-color 0.2s;
        }

        .mb-stat-card:hover {
          border-color: var(--mb-border-hover);
        }

        .mb-stat-card__label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--mb-muted);
          margin-bottom: 8px;
        }

        .mb-stat-card__value {
          font-size: 2rem;
          font-weight: 900;
          color: #fff;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .mb-stat-card__sub {
          font-size: 0.75rem;
          color: var(--mb-muted);
          margin-top: 4px;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--mb-border); border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
      `}</style>

      <div className="mb-shell">
        {/* Sidebar */}
        <aside className="mb-sidebar">
          <div className="mb-sidebar-brand">
            <div className="mb-sidebar-brand-icon">🎲</div>
            <div className="mb-sidebar-brand-text">
              <div className="mb-sidebar-brand-name">
                Marya<em>Bet</em>
              </div>
              <div className="mb-sidebar-brand-sub">Admin Portal</div>
            </div>
          </div>

          <nav className="mb-nav">
            <div className="mb-nav-section">Content</div>

            <Link href="/admin" className="mb-nav-link">
              <LayoutDashboard size={16} />
              Dashboard
              <ChevronRight size={13} className="mb-nav-chevron" />
            </Link>

            <Link href="/admin/posts/new" className="mb-nav-link">
              <PlusSquare size={16} />
              New Post
              <ChevronRight size={13} className="mb-nav-chevron" />
            </Link>

            <Link href="/admin" className="mb-nav-link" style={{ paddingLeft: 38 }}>
              <FileText size={14} />
              All Posts
              <ChevronRight size={13} className="mb-nav-chevron" />
            </Link>

            <div className="mb-nav-section">Promotions</div>

            <Link href="/admin/promos" className="mb-nav-link">
              <Ticket size={16} />
              All Promos
              <ChevronRight size={13} className="mb-nav-chevron" />
            </Link>

            <Link href="/admin/promos/new" className="mb-nav-link">
              <PlusCircle size={16} />
              New Promo
              <ChevronRight size={13} className="mb-nav-chevron" />
            </Link>

            <div className="mb-nav-section">System</div>

            <Link href="/admin/ads" className="mb-nav-link">
              <Zap size={16} />
              System Ads
              <ChevronRight size={13} className="mb-nav-chevron" />
            </Link>

            <Link href="/admin" className="mb-nav-link">
              <Zap size={16} />
              API Usage
              <ChevronRight size={13} className="mb-nav-chevron" />
            </Link>
          </nav>

          <div className="mb-sidebar-footer">
            <a
              href="/en/blog"
              target="_blank"
              className="mb-view-site-link"
            >
              <Globe size={16} />
              View Site ↗
            </a>

            <form
              action={async () => {
                "use server";
                const { cookies: getCookies } = await import("next/headers");
                const c = await getCookies();
                c.delete(SESSION_COOKIE);
                redirect(`/admin/${SECRET_PATH}`);
              }}
            >
              <button type="submit" className="mb-logout-btn">
                <LogOut size={16} />
                Sign Out
              </button>
            </form>
          </div>
        </aside>

        {/* Main */}
        <div className="mb-main">
          <header className="mb-topbar">
            <div className="mb-topbar-dot" />
            <span className="mb-topbar-status">System operational</span>
            <div className="mb-topbar-divider" />
            <span className="mb-topbar-status">MaryaBet Admin v1.0</span>
            <span className="mb-topbar-time">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </header>

          <main className="mb-content">{children}</main>
        </div>
      </div>
    </>
  );
}
