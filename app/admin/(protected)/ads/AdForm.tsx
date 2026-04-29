"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export interface SystemAd {
  id?: string;
  title: string;
  description: string;
  badgeText: string;
  imageUrl: string;
  ctaText: string;
  ctaUrl: string;
  delaySeconds: number;
  placement: string;
  active: boolean;
}

export default function AdForm({ initialData }: { initialData?: SystemAd }) {
  const router = useRouter();
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
      
      setFormData({ ...formData, imageUrl: json.url });
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  }

  const [formData, setFormData] = useState<SystemAd>(
    initialData || {
      title: "",
      description: "",
      badgeText: "Notice",
      imageUrl: "/hero-coins.png",
      ctaText: "Learn More",
      ctaUrl: "",
      delaySeconds: 5,
      placement: "global",
      active: true,
    }
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const isEditing = !!initialData?.id;
    const url = isEditing ? `/api/admin/ads/${initialData.id}` : "/api/admin/ads";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save ad");

      router.push("/admin/ads");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setSaving(false);
    }
  }

  const PREDEFINED_IMAGES = [
    "/hero-coins.png",
    "/sports_action_hero.png",
    "/marybet-hero.png",
    "/premium-hero.png"
  ];

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}

      <div className="post-form__grid">
        <div className="form-section-header">Basic Details</div>

        <div className="form-field form-field--full">
          <label>Headline (HTML allowed)</label>
          <input
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Fast Track Your <span>TouchPoint</span> Payouts"
          />
        </div>

        <div className="form-field form-field--full">
          <label>Description</label>
          <textarea
            required
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="form-field">
          <label>Badge Text</label>
          <input
            required
            value={formData.badgeText}
            onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
            placeholder="e.g. VIP Access"
          />
        </div>

        <div className="form-field">
          <label>Placement</label>
          <select
            value={formData.placement}
            onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
          >
            <option value="global">Global (All Pages)</option>
            <option value="home">Home Page Only</option>
            <option value="sports">Sports Page Only</option>
            <option value="promos">Promos Page Only</option>
          </select>
        </div>

        <div className="form-section-header">Call to Action</div>

        <div className="form-field">
          <label>Button Text</label>
          <input
            required
            value={formData.ctaText}
            onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
          />
        </div>

        <div className="form-field">
          <label>Button URL (e.g. WhatsApp Link)</label>
          <input
            required
            type="url"
            value={formData.ctaUrl}
            onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
            placeholder="https://wa.me/..."
          />
        </div>

        <div className="form-section-header">Media & Settings</div>

        <div className="form-field form-field--full">
          <label>Image Source</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
            <select
              value={PREDEFINED_IMAGES.includes(formData.imageUrl) ? formData.imageUrl : "custom"}
              onChange={(e) => {
                if (e.target.value !== "custom") {
                  setFormData({ ...formData, imageUrl: e.target.value });
                }
              }}
              style={{ flex: 1 }}
            >
              {PREDEFINED_IMAGES.map((img) => (
                <option key={img} value={img}>{img}</option>
              ))}
              <option value="custom">Custom URL or Upload...</option>
            </select>
            
            <label className="admin-btn-secondary" style={{ cursor: uploading ? 'not-allowed' : 'pointer', margin: 0, padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          
          {!PREDEFINED_IMAGES.includes(formData.imageUrl) && (
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          )}
        </div>

        <div className="form-field">
          <label>Appearance Delay (seconds)</label>
          <input
            required
            type="number"
            min="0"
            value={formData.delaySeconds}
            onChange={(e) => setFormData({ ...formData, delaySeconds: parseInt(e.target.value) || 0 })}
          />
          <div className="form-field__hint">Time before ad pops up.</div>
        </div>

        <div className="form-field form-field--full" style={{ flexDirection: "row", alignItems: "center" }}>
          <input
            type="checkbox"
            id="active-toggle"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            style={{ width: "auto" }}
          />
          <label htmlFor="active-toggle" style={{ margin: 0, cursor: "pointer" }}>Ad is Live</label>
        </div>
      </div>

      <div className="post-form__actions">
        <button type="submit" className="admin-btn-primary" disabled={saving}>
          {saving ? "Saving..." : "Save Ad"}
        </button>
        <button
          type="button"
          className="admin-btn-secondary"
          onClick={() => router.push("/admin/ads")}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
