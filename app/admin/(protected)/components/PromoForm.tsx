"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PromoFormData {
  rank: string;
  bookmaker: string;
  logoText: string;
  logoColor: string;
  logoUrl: string;
  promoCode: string;
  bonusAmount: string;
  bonusLabel: string;
  rating: string;
  category: string;
  affiliateUrl: string;
  description: string;
  termsText: string;
  validUntil: string;
  verified: boolean;
  exclusive: boolean;
  tags: string;
  active: boolean;
}

const EMPTY_FORM: PromoFormData = {
  rank: "99",
  bookmaker: "",
  logoText: "",
  logoColor: "#7c3aed",
  logoUrl: "",
  promoCode: "",
  bonusAmount: "",
  bonusLabel: "Bonus up to",
  rating: "8.5",
  category: "Welcome Bonus",
  affiliateUrl: "",
  description: "",
  termsText: "New customers only. 18+. T&Cs apply.",
  validUntil: "",
  verified: true,
  exclusive: false,
  tags: "",
  active: true,
};

interface Props {
  initialData?: Partial<PromoFormData>;
  mode: "create" | "edit";
  id?: string;
}

export default function PromoForm({ initialData, mode, id }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<PromoFormData>({
    ...EMPTY_FORM,
    ...initialData,
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");

      setForm({ ...form, logoUrl: json.url });
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      rank: parseInt(form.rank) || 99,
      rating: parseFloat(form.rating) || 8.0,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    let res: Response;
    if (mode === "create") {
      res = await fetch("/api/admin/promos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      res = await fetch(`/api/admin/promos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setSaving(false);
    if (res.ok) {
      router.push("/admin/promos");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="post-form__grid">

        {/* Bookmaker & rank */}
        <div className="form-field">
          <label htmlFor="bookmaker">Bookmaker Name *</label>
          <input id="bookmaker" name="bookmaker" value={form.bookmaker} onChange={handleChange} required placeholder="1xBet" />
        </div>
        <div className="form-field">
          <label htmlFor="rank">Rank <span className="form-field__hint">(1 = top)</span></label>
          <input id="rank" name="rank" type="number" min="1" value={form.rank} onChange={handleChange} />
        </div>

        {/* Logo */}
        <div className="form-field">
          <label htmlFor="logoText">Logo Text <span className="form-field__hint">(shown if no image)</span></label>
          <input id="logoText" name="logoText" value={form.logoText} onChange={handleChange} placeholder="1XBET" />
        </div>
        <div className="form-field">
          <label htmlFor="logoColor">Logo Background Color</label>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input id="logoColor" name="logoColor" type="color" value={form.logoColor} onChange={handleChange} style={{ width: 48, height: 40, padding: 2, borderRadius: 6 }} />
            <input name="logoColor" value={form.logoColor} onChange={handleChange} placeholder="#003082" style={{ flex: 1 }} />
          </div>
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="logoUrl">Logo Image <span className="form-field__hint">(Overrides text/color if provided)</span></label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: form.logoUrl ? '12px' : '0' }}>
            <input id="logoUrl" name="logoUrl" type="url" value={form.logoUrl} onChange={handleChange} placeholder="https://example.com/logo.png or upload file" style={{ flex: 1 }} />
            <label className="admin-btn-secondary" style={{ cursor: uploading ? 'not-allowed' : 'pointer', margin: 0, padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {uploading ? "Uploading..." : "Upload File"}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                disabled={uploading}
              />
            </label>
          </div>
          {form.logoUrl && (
            <img src={form.logoUrl} alt="Logo preview" className="cover-preview" style={{ height: 60, objectFit: "contain", background: form.logoColor, padding: 8 }} />
          )}
        </div>

        {/* Promo code */}
        <div className="form-field">
          <label htmlFor="promoCode">Promo Code *</label>
          <input id="promoCode" name="promoCode" value={form.promoCode} onChange={handleChange} required placeholder="MARYAVIP" style={{ fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase" }} />
        </div>
        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={form.category} onChange={handleChange}>
            {["Welcome Bonus", "Deposit Bonus", "Free Bet", "No Deposit", "Cashback", "Reload Bonus"].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Bonus */}
        <div className="form-field">
          <label htmlFor="bonusAmount">Bonus Amount <span className="form-field__hint">e.g. €500, 150%</span></label>
          <input id="bonusAmount" name="bonusAmount" value={form.bonusAmount} onChange={handleChange} placeholder="€500" />
        </div>
        <div className="form-field">
          <label htmlFor="bonusLabel">Bonus Label</label>
          <input id="bonusLabel" name="bonusLabel" value={form.bonusLabel} onChange={handleChange} placeholder="Bonus up to" />
        </div>

        {/* Rating & affiliate */}
        <div className="form-field">
          <label htmlFor="rating">Rating <span className="form-field__hint">(e.g. 9.5 out of 10)</span></label>
          <input id="rating" name="rating" type="number" min="0" max="10" step="0.1" value={form.rating} onChange={handleChange} />
        </div>
        <div className="form-field">
          <label htmlFor="affiliateUrl">Affiliate / Offer URL</label>
          <input id="affiliateUrl" name="affiliateUrl" type="url" value={form.affiliateUrl} onChange={handleChange} placeholder="https://bookmaker.com/?ref=MARYA" />
        </div>

        {/* Description */}
        <div className="form-field form-field--full">
          <label htmlFor="description">Short Description</label>
          <textarea id="description" name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Brief description shown below the promo code card…" />
        </div>

        {/* Terms */}
        <div className="form-field form-field--full">
          <label htmlFor="termsText">Terms & Conditions Text</label>
          <textarea id="termsText" name="termsText" value={form.termsText} onChange={handleChange} rows={2} placeholder="New customers only. 18+. Min deposit €10. T&Cs apply." />
        </div>

        {/* Valid until */}
        <div className="form-field">
          <label htmlFor="validUntil">Valid Until</label>
          <input id="validUntil" name="validUntil" type="date" value={form.validUntil} onChange={handleChange} />
        </div>

        {/* Tags */}
        <div className="form-field">
          <label htmlFor="tags">Tags <span className="form-field__hint">(comma-separated)</span></label>
          <input id="tags" name="tags" value={form.tags} onChange={handleChange} placeholder="Football, Sports, Casino" />
        </div>

        {/* Checkboxes */}
        <div className="form-field form-field--full" style={{ flexDirection: "row", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <label style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
            <input type="checkbox" name="verified" checked={form.verified} onChange={handleChange} style={{ width: 18, height: 18 }} />
            ✓ Verified by our team
          </label>
          <label style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
            <input type="checkbox" name="exclusive" checked={form.exclusive} onChange={handleChange} style={{ width: 18, height: 18 }} />
            ⭐ Exclusive Offer
          </label>
          <label style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
            <input type="checkbox" name="active" checked={form.active} onChange={handleChange} style={{ width: 18, height: 18 }} />
            🟢 Active (visible on site)
          </label>
        </div>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="post-form__actions">
        <button type="button" onClick={() => router.back()} className="admin-btn-secondary">Cancel</button>
        <button type="submit" className="admin-btn-primary" disabled={saving}>
          {saving ? "Saving…" : mode === "create" ? "Add Promo Code" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
