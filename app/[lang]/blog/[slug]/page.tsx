import { getAllPosts, getPostBySlug } from "../../../lib/posts";
import { notFound } from "next/navigation";
import Footer from "../../../components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };


  const canonical = `/${lang}/blog/${slug}`;
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    authors: post.author ? [{ name: post.author }] : undefined,
    alternates: {
      canonical,
      languages: {
        en: `/en/blog/${slug}`,
        fr: `/fr/blog/${slug}`,
        es: `/es/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      url: canonical,
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
      images: post.coverImage
        ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

function estimateReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  Strategy: "#e63946",
  Football: "#2ec4b6",
  Basketball: "#ff9f1c",
  Tennis: "#8338ec",
  Crypto: "#3a86ff",
  "Horse Racing": "#fb5607",
  Basics: "#06d6a0",
  General: "#adb5bd",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);


  const categoryColor = CATEGORY_COLORS[post.category] ?? "#e63946";

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverImage || undefined,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author || "Admin" },
    keywords: post.keywords?.join(", "),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main
        style={{ minHeight: "100vh", background: "#000", color: "#fff", paddingTop: "100px" }}
      >
        {/* Hero */}
        <header
          style={{
            position: "relative",
            background: "#000",
            paddingBottom: "0",
            minHeight: "80vh",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Cover image as background */}
          {post.coverImage && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.4,
                  transform: "scale(1.05)",
                  animation: "subtleZoom 20s ease-out forwards",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 40%, #000 100%)",
                }}
              />
            </>
          )}

          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "960px",
              padding: "120px 24px 60px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* Category badge */}
            <div style={{ marginBottom: "24px" }}>
              <span
                style={{
                  display: "inline-block",
                  background: "transparent",
                  border: `1px solid ${categoryColor}`,
                  color: categoryColor,
                  padding: "6px 20px",
                  borderRadius: "99px",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  backdropFilter: "blur(4px)",
                }}
              >
                {post.category}
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: "28px",
                textShadow: "0 10px 30px rgba(0,0,0,0.8)",
                maxWidth: "800px",
              }}
            >
              {post.title}
            </h1>

            <p
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                color: "#a0a0a0",
                lineHeight: 1.6,
                marginBottom: "40px",
                maxWidth: "700px",
                fontWeight: 400,
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
              }}
            >
              {post.excerpt}
            </p>

            {/* Meta row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "24px",
                flexWrap: "wrap",
                fontSize: "0.9rem",
                color: "#777",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {post.author && (
                <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${categoryColor} 0%, #000 100%)`,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: "0.9rem",
                      boxShadow: `0 0 15px ${categoryColor}40`,
                    }}
                  >
                    {post.author[0].toUpperCase()}
                  </span>
                  <span style={{ color: "#fff", fontWeight: 800 }}>{post.author}</span>
                </span>
              )}
              <span style={{ opacity: 0.5 }}>|</span>
              <span>{formatDate(post.publishedAt)}</span>
              <span style={{ opacity: 0.5 }}>|</span>
              <span style={{ color: categoryColor }}>
                {estimateReadTime(post.content)}
              </span>
            </div>
          </div>
        </header>

        {/* Article body */}
        <article
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            padding: "40px 24px 100px",
          }}
        >
          {post.content ? (
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <p style={{ color: "#555", textAlign: "center", padding: "60px 0" }}>
              No content available for this post.
            </p>
          )}

          {/* Keywords */}
          {post.keywords && post.keywords.length > 0 && (
            <div
              style={{
                marginTop: "60px",
                paddingTop: "32px",
                borderTop: "1px solid #111",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#444",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "12px",
                }}
              >
                Topics
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {post.keywords.map((kw) => (
                  <span
                    key={kw}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid #222",
                      padding: "4px 14px",
                      borderRadius: "20px",
                      fontSize: "0.8rem",
                      color: "#777",
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div style={{ marginTop: "48px" }}>
            <Link
              href={`/${lang}/blog`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#fff",
                fontWeight: 800,
                fontSize: "0.9rem",
                textDecoration: "none",
                border: "1px solid #222",
                padding: "12px 24px",
                borderRadius: "10px",
                transition: "border-color 0.2s",
              }}
            >
              ← Back to Blog
            </Link>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section
            style={{
              background: "#050505",
              borderTop: "1px solid #111",
              padding: "64px 24px",
            }}
          >
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <h2
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  marginBottom: "40px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Related Articles
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "24px",
                }}
              >
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/${lang}/blog/${rel.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <article
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid #1a1a1a",
                        borderRadius: "14px",
                        overflow: "hidden",
                        transition: "transform 0.25s, border-color 0.25s",
                      }}
                      className="blog-card"
                    >
                      <div
                        style={{
                          height: "180px",
                          background: "#111",
                          position: "relative",
                        }}
                      >
                        {rel.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={rel.coverImage}
                            alt={rel.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        ) : null}
                      </div>
                      <div style={{ padding: "20px" }}>
                        <p
                          style={{
                            fontSize: "0.7rem",
                            color: "#555",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            marginBottom: "8px",
                          }}
                        >
                          {formatDate(rel.publishedAt)}
                        </p>
                        <h3
                          style={{
                            fontSize: "1rem",
                            fontWeight: 800,
                            lineHeight: 1.4,
                          }}
                        >
                          {rel.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </main>

      <style>{`
        @keyframes subtleZoom {
          from { transform: scale(1.02); }
          to { transform: scale(1.1); }
        }
        .prose-content {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1.15rem;
          line-height: 1.9;
          color: #d0d0d0;
          font-weight: 400;
        }
        .prose-content h1,
        .prose-content h2,
        .prose-content h3,
        .prose-content h4 {
          color: #fff;
          font-weight: 900;
          line-height: 1.3;
          margin: 2.5em 0 1em;
          letter-spacing: -0.01em;
        }
        .prose-content h2 { font-size: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5em; }
        .prose-content h3 { font-size: 1.5rem; }
        .prose-content p { margin: 0 0 1.8em; }
        .prose-content a { 
          color: ${categoryColor}; 
          text-decoration: none;
          border-bottom: 1px solid ${categoryColor}80;
          transition: border-color 0.2s, color 0.2s;
        }
        .prose-content a:hover {
          border-bottom-color: ${categoryColor};
          color: #fff;
        }
        .prose-content strong { color: #fff; font-weight: 700; }
        .prose-content blockquote {
          position: relative;
          border-left: 4px solid ${categoryColor};
          padding: 24px 32px;
          margin: 3em 0;
          background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, transparent 100%);
          border-radius: 0 12px 12px 0;
          color: #fff;
          font-style: italic;
          font-size: 1.3rem;
          line-height: 1.6;
          font-weight: 300;
        }
        .prose-content ul,
        .prose-content ol {
          padding-left: 1.2em;
          margin: 0 0 1.8em;
        }
        .prose-content li { margin: 0.6em 0; }
        .prose-content li::marker { color: ${categoryColor}; font-weight: 900; }
        .prose-content code {
          background: rgba(255,255,255,0.08);
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 0.85em;
          color: #fff;
          font-family: monospace;
        }
        .prose-content pre {
          background: #080808;
          border: 1px solid #1a1a1a;
          border-radius: 12px;
          padding: 24px;
          overflow-x: auto;
          margin: 2.5em 0;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        }
        .prose-content pre code {
          background: none;
          padding: 0;
          font-size: 0.9em;
          color: #a0a0a0;
        }
        .prose-content img {
          max-width: 100%;
          border-radius: 16px;
          margin: 3em 0;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }
        .prose-content hr {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          margin: 4em 0;
        }
        .blog-card:hover {
          transform: translateY(-5px);
          border-color: #333 !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
      `}</style>
    </>
  );
}
