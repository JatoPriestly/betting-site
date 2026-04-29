"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

interface Promo {
  id: string;
  rank: number;
  bookmaker: string;
  promoCode: string;
  bonusAmount: string;
  rating: number;
  active: boolean;
}

export default function AdminPromosPage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);
  const router = useRouter();

  async function fetchPromos() {
    const res = await fetch("/api/admin/promos");
    if (res.ok) setPromos(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    fetchPromos();
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete promo for "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/promos/${id}`, { method: "DELETE" });
    setDeleting(null);
    fetchPromos();
  }

  async function handleToggleActive(promo: Promo) {
    setToggling(promo.id);
    await fetch(`/api/admin/promos/${promo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !promo.active }),
    });
    setToggling(null);
    fetchPromos();
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Promo Codes</h1>
          <p style={{ color: "var(--mb-muted)", fontSize: "0.875rem", marginTop: 4 }}>
            Manage bookmaker codes shown on{" "}
            <a
              href="/promos"
              target="_blank"
              style={{ color: "var(--mb-gold)", textDecoration: "none" }}
            >
              /promos ↗
            </a>
          </p>
        </div>
        <Link href="/admin/promos/new" className="admin-btn-primary">
          <PlusCircle size={15} />
          New Promo
        </Link>
      </div>

      {loading ? (
        <div className="admin-loading">Loading…</div>
      ) : promos.length === 0 ? (
        <div className="admin-empty">
          <p>No promo codes yet.</p>
          <Link href="/admin/promos/new" className="admin-btn-primary">
            <PlusCircle size={15} /> Add Promo
          </Link>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Bookmaker</th>
                <th>Code</th>
                <th>Bonus</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => (
                <tr key={promo.id}>
                  <td>
                    <span
                      style={{
                        fontWeight: 700,
                        color: "var(--mb-gold)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      #{promo.rank}
                    </span>
                  </td>
                  <td style={{ fontWeight: 600 }}>{promo.bookmaker}</td>
                  <td>
                    <span
                      style={{
                        fontFamily: "monospace",
                        background: "rgba(212,175,55,0.08)",
                        border: "1px solid rgba(212,175,55,0.15)",
                        padding: "3px 10px",
                        borderRadius: 6,
                        fontSize: "0.82rem",
                        color: "var(--mb-gold-light)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {promo.promoCode}
                    </span>
                  </td>
                  <td
                    style={{
                      color: "#fbbf24",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                    }}
                  >
                    {promo.bonusAmount}
                  </td>
                  <td style={{ color: "var(--mb-muted)", fontSize: "0.85rem" }}>
                    {promo.rating}/10
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleActive(promo)}
                      disabled={toggling === promo.id}
                      style={{
                        padding: "4px 12px",
                        borderRadius: 20,
                        border: "1px solid",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "all 0.15s",
                        background: promo.active
                          ? "rgba(34,197,94,0.08)"
                          : "rgba(255,255,255,0.04)",
                        color: promo.active ? "var(--mb-green)" : "var(--mb-muted)",
                        borderColor: promo.active
                          ? "rgba(34,197,94,0.2)"
                          : "var(--mb-border)",
                        opacity: toggling === promo.id ? 0.5 : 1,
                      }}
                    >
                      {toggling === promo.id
                        ? "…"
                        : promo.active
                        ? "● Live"
                        : "○ Off"}
                    </button>
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <button
                        onClick={() =>
                          router.push(`/admin/promos/${promo.id}/edit`)
                        }
                        className="admin-btn-edit"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Pencil size={12} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id, promo.bookmaker)}
                        className="admin-btn-delete"
                        disabled={deleting === promo.id}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <Trash2 size={12} />
                        {deleting === promo.id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
