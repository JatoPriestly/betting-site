import { getAllPosts } from "../../lib/posts";
import { getActivePromos } from "../../lib/promos";
import { languageAlternates, intlLocale } from "../../i18n";
import { getDictionary } from "../../dictionaries";
import Link from "next/link";
import Footer from "../../components/Footer";
import type { Metadata } from "next";
import PromoCodeStrip from "../../components/PromoCodeStrip";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.blog_title,
    description: dict.meta.blog_desc,
    alternates: {
      canonical: `/${lang}/blog`,
      languages: languageAlternates((locale) => `/${locale}/blog`),
    },
    openGraph: {
      title: dict.meta.blog_title,
      description: dict.meta.blog_desc,
      type: "website",
      url: `/${lang}/blog`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.blog_title,
    },
  };
}

const CATEGORY_COLORS: Record<string, string> = {
  Strategy: "#2fa5e8",
  Football: "#ffd54f",
  Basketball: "#ff9f1c",
  Tennis: "#8338ec",
  Crypto: "#3a86ff",
  "Horse Racing": "#2fa5e8",
  Basics: "#06d6a0",
  General: "#adb5bd",
};

function estimateReadTime(content: string, unit: string): string {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} ${unit}`;
}

function formatDate(iso: string, lang: string): string {
  return new Date(iso).toLocaleDateString(intlLocale(lang), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const posts = await getAllPosts();
  const promos = (await getActivePromos()).slice(0, 5);


  return (
    <>
      <main
        style={{
          minHeight: "100vh",
          background: "var(--navy-deep)",
          color: "var(--text-primary)",
          paddingTop: "120px",
          paddingBottom: "0",
        }}
      >
        {/* Hero */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px 80px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              display: "inline-block",
              background: "rgba(47, 165, 232, 0.12)",
              border: "1px solid rgba(47, 165, 232, 0.3)",
              color: "var(--cyan)",
              padding: "6px 18px",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            {dict.blog.badge}
          </p>
          <h1
            style={{
              fontSize: "clamp(2.8rem, 7vw, 5rem)",
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "20px",
            }}
          >
            {dict.blog.title1}
            <br />
            <span style={{ color: "var(--cyan)" }}>{dict.blog.title2}</span>
          </h1>
          <p
            style={{
              color: "#888",
              fontSize: "1.15rem",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            {dict.blog.subtitle}
          </p>
          <PromoCodeStrip promos={promos.map(p => ({ id: p.id, bookmaker: p.bookmaker, promoCode: p.promoCode, bonusAmount: p.bonusAmount }))} dict={dict} />
        </section>

        {/* Post grid */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px 80px",
          }}
        >
          {posts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "#555",
                fontSize: "1.1rem",
              }}
            >
              {dict.blog.empty}
            </div>
          ) : (
            <>
              {/* Featured first post */}
              <Link
                href={`/${lang}/blog/${posts[0].slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <article
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0",
                    background: "#ffffff",
                    border: "1px solid var(--border)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    marginBottom: "48px",
                    transition: "transform 0.3s ease, border-color 0.3s ease",
                    color: "var(--navy-deep)",
                  }}
                  className="blog-featured-card"
                >
                  {/* Image */}
                  <div
                    style={{
                      position: "relative",
                      background: "var(--navy)",
                      minHeight: "380px",
                    }}
                  >
                    {posts[0].coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={posts[0].coverImage}
                        alt={posts[0].title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          position: "absolute",
                          inset: 0,
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(135deg,var(--navy) 0%,var(--navy-deep) 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "4rem",
                        }}
                      >
                        ⚽
                      </div>
                    )}
                    <span
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "20px",
                        background:
                          CATEGORY_COLORS[posts[0].category] ?? "var(--cyan)",
                        color: "#fff",
                        padding: "4px 14px",
                        borderRadius: "6px",
                        fontSize: "0.7rem",
                        fontWeight: 900,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {posts[0].category}
                    </span>
                  </div>
                  {/* Content */}
                  <div
                    style={{
                      padding: "48px 40px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        fontSize: "0.8rem",
                        color: "#557091",
                        fontWeight: 700,
                        marginBottom: "20px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      <span>{formatDate(posts[0].publishedAt, lang)}</span>
                      <span>·</span>
                      <span>{estimateReadTime(posts[0].content, dict.blog.read_time)}</span>
                    </div>
                    <h2
                      style={{
                        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                        fontWeight: 900,
                        lineHeight: 1.2,
                        marginBottom: "16px",
                      }}
                    >
                      {posts[0].title}
                    </h2>
                    <p
                      style={{
                        color: "#557091",
                        lineHeight: 1.75,
                        marginBottom: "32px",
                        fontSize: "1rem",
                      }}
                    >
                      {posts[0].excerpt}
                    </p>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "var(--cyan)",
                        fontWeight: 900,
                        fontSize: "0.9rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {dict.blog.read_article} <span style={{ fontSize: "1.2rem" }}>→</span>
                    </div>
                  </div>
                </article>
              </Link>

              {/* Remaining posts grid */}
              {posts.length > 1 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: "32px",
                  }}
                >
                  {posts.slice(1).map((post) => (
                    <Link
                      key={post.slug}
                      href={`/${lang}/blog/${post.slug}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <article
                        style={{
                          background: "#ffffff",
                          border: "1px solid var(--border)",
                          borderRadius: "16px",
                          overflow: "hidden",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition:
                            "transform 0.25s ease, border-color 0.25s ease",
                          color: "var(--navy-deep)",
                        }}
                        className="blog-card"
                      >
                        {/* Cover */}
                        <div
                          style={{
                            height: "210px",
                           background: "var(--navy)",
                            position: "relative",
                            flexShrink: 0,
                          }}
                        >
                          {post.coverImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                background:
                                  "linear-gradient(135deg,var(--navy) 0%,var(--navy-deep) 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "3rem",
                              }}
                            >
                              📰
                            </div>
                          )}
                          <span
                            style={{
                              position: "absolute",
                              top: "16px",
                              left: "16px",
                              background:
                                CATEGORY_COLORS[post.category] ?? "var(--cyan)",
                              color: "#fff",
                              padding: "3px 10px",
                              borderRadius: "5px",
                              fontSize: "0.65rem",
                              fontWeight: 900,
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                            }}
                          >
                            {post.category}
                          </span>
                        </div>

                        {/* Body */}
                        <div
                          style={{
                            padding: "28px 24px",
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              fontSize: "0.75rem",
                              color: "#557091",
                              fontWeight: 700,
                              marginBottom: "14px",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                            }}
                          >
                            <span>{formatDate(post.publishedAt, lang)}</span>
                            <span>·</span>
                            <span>{estimateReadTime(post.content, dict.blog.read_time)}</span>
                          </div>
                          <h2
                            style={{
                              fontSize: "1.25rem",
                              fontWeight: 800,
                              lineHeight: 1.35,
                              marginBottom: "12px",
                            }}
                          >
                            {post.title}
                          </h2>
                          <p
                            style={{
                              color: "#557091",
                              lineHeight: 1.65,
                              fontSize: "0.9rem",
                              flex: 1,
                              marginBottom: "20px",
                            }}
                          >
                            {post.excerpt}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              color: "var(--cyan)",
                              fontWeight: 800,
                              fontSize: "0.8rem",
                              letterSpacing: "0.06em",
                              textTransform: "uppercase",
                            }}
                          >
                            {dict.blog.read_more} <span>→</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </section>

        <Footer dict={dict} />
      </main>

      <style>{`
        .blog-featured-card {
          box-shadow: 0 10px 30px rgba(18, 72, 115, 0.15);
        }
        .blog-featured-card:hover {
          transform: translateY(-3px);
          border-color: var(--cyan) !important;
          box-shadow: 0 20px 48px rgba(18, 72, 115, 0.3);
        }
        .blog-card {
          box-shadow: 0 8px 24px rgba(18, 72, 115, 0.1);
        }
        .blog-card:hover {
          transform: translateY(-4px);
          border-color: var(--cyan) !important;
          box-shadow: 0 16px 36px rgba(18, 72, 115, 0.25);
        }
        @media (max-width: 768px) {
          .blog-featured-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
