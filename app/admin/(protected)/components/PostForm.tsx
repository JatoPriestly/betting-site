"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  coverImage: string;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
}

const EMPTY_FORM: PostFormData = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "General",
  author: "",
  coverImage: "",
  publishedAt: new Date().toISOString().slice(0, 16),
  seoTitle: "",
  seoDescription: "",
  keywords: "",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface Props {
  initialData?: Partial<PostFormData>;
  mode: "create" | "edit";
  slug?: string;
}

export default function PostForm({ initialData, mode, slug }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<PostFormData>({
    ...EMPTY_FORM,
    ...initialData,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [autoSlug, setAutoSlug] = useState(mode === "create");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      // Auto-fill SEO title from title when empty
      if (name === "title" && autoSlug) {
        next.slug = slugify(value);
        if (!prev.seoTitle || prev.seoTitle === prev.title) {
          next.seoTitle = value;
        }
      }
      if (name === "slug") setAutoSlug(false);
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      keywords: form.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      publishedAt: new Date(form.publishedAt).toISOString(),
    };

    let res: Response;
    if (mode === "create") {
      res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      res = await fetch(`/api/admin/posts/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setSaving(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="post-form__grid">
        {/* Title */}
        <div className="form-field form-field--full">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="My awesome blog post"
          />
        </div>

        {/* Slug */}
        <div className="form-field form-field--full">
          <label htmlFor="slug">
            Slug * <span className="form-field__hint">(URL-friendly ID)</span>
          </label>
          <input
            id="slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            placeholder="my-awesome-blog-post"
            readOnly={mode === "edit"}
            className={mode === "edit" ? "input-readonly" : ""}
          />
        </div>

        {/* Excerpt */}
        <div className="form-field form-field--full">
          <label htmlFor="excerpt">Excerpt *</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            rows={3}
            required
            placeholder="A short teaser shown in listing cards…"
          />
        </div>

        {/* Category & Author */}
        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {["General", "Strategy", "Basics", "Football", "Basketball", "Tennis", "Crypto", "Horse Racing"].map(
              (c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              )
            )}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>

        {/* Cover Image */}
        <div className="form-field form-field--full">
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            id="coverImage"
            name="coverImage"
            value={form.coverImage}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/…"
          />
          {form.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.coverImage}
              alt="Cover preview"
              className="cover-preview"
            />
          )}
        </div>

        {/* Published At */}
        <div className="form-field">
          <label htmlFor="publishedAt">Publish Date</label>
          <input
            id="publishedAt"
            name="publishedAt"
            type="datetime-local"
            value={form.publishedAt}
            onChange={handleChange}
          />
        </div>

        {/* Content */}
        <div className="form-field form-field--full">
          <label htmlFor="content">
            Content{" "}
            <span className="form-field__hint">(HTML supported)</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={16}
            placeholder="<p>Write your article here…</p><h2>Section heading</h2>"
          />
        </div>

        {/* SEO Section */}
        <div className="form-section-header">🔍 SEO Settings</div>

        <div className="form-field form-field--full">
          <label htmlFor="seoTitle">SEO Title</label>
          <input
            id="seoTitle"
            name="seoTitle"
            value={form.seoTitle}
            onChange={handleChange}
            placeholder="My Post Title — Site Name"
          />
          <p className="form-field__counter">{form.seoTitle.length}/60 chars</p>
        </div>

        <div className="form-field form-field--full">
          <label htmlFor="seoDescription">Meta Description</label>
          <textarea
            id="seoDescription"
            name="seoDescription"
            value={form.seoDescription}
            onChange={handleChange}
            rows={3}
            placeholder="A compelling 155-character description for search engines…"
          />
          <p className="form-field__counter">
            {form.seoDescription.length}/160 chars
          </p>
        </div>

        <div className="form-field form-field--full">
          <label htmlFor="keywords">
            Keywords{" "}
            <span className="form-field__hint">(comma-separated)</span>
          </label>
          <input
            id="keywords"
            name="keywords"
            value={form.keywords}
            onChange={handleChange}
            placeholder="sports betting, bankroll, strategy"
          />
        </div>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="post-form__actions">
        <button type="button" onClick={() => router.back()} className="admin-btn-secondary">
          Cancel
        </button>
        <button type="submit" className="admin-btn-primary" disabled={saving}>
          {saving
            ? "Saving…"
            : mode === "create"
            ? "Publish Post"
            : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
