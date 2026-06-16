import { getPostBySlug, getAllPosts } from "@/app/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};


  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: `${siteUrl}/blog/${post.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [`${siteUrl}/blog/${post.slug}/opengraph-image`],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();


  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt,
    image: post.coverImage,
    url: `${siteUrl}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Marya Bet",
      logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.ico` },
    },
  };

  return (
    <div className="post-page">
      {/* Header */}
      <header className="blog-header">
        <div className="blog-header__inner">
          <Link href="/" className="blog-header__logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image src="/logo.png" alt="Marya Bet Logo" width={28} height={28} style={{ borderRadius: "6px" }} />
            MARYA BET
          </Link>
          <nav className="blog-header__nav">
            <Link href="/blog">← Blog</Link>
          </nav>
        </div>
      </header>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="post-main">
        {/* Cover image */}
        {post.coverImage && (
          <div className="post-cover">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="post-cover__img"
              priority
              sizes="100vw"
            />
            <div className="post-cover__overlay" />
          </div>
        )}

        <article className="post-article">
          {/* Meta */}
          <div className="post-article__category">{post.category}</div>
          <h1 className="post-article__title">{post.title}</h1>
          <div className="post-article__meta">
            <span>By {post.author}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </div>

          <p className="post-article__excerpt">{post.excerpt}</p>

          {/* Body */}
          <div
            className="post-article__body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Keywords / tags */}
          {post.keywords && post.keywords.length > 0 && (
            <div className="post-article__tags">
              {post.keywords.map((kw) => (
                <span key={kw} className="tag">
                  #{kw}
                </span>
              ))}
            </div>
          )}
        </article>

        <div className="post-back">
          <Link href="/blog" className="btn-back">
            ← Back to all articles
          </Link>
        </div>
      </main>
    </div>
  );
}
