import { getAllPosts, BlogPost } from "@/app/lib/posts";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert sports betting strategies, tips, odds guides, and winning techniques — all in one place.",
  openGraph: {
    title: "Marya Betting Blog — Expert Sports Betting Strategies",
    description:
      "Expert sports betting strategies, tips, odds guides, and winning techniques — all in one place.",
    type: "website",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="featured-card group">
      <div className="featured-card__image-wrapper">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="featured-card__image"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        )}
        <div className="featured-card__overlay" />
        <span className="featured-card__badge">{post.category}</span>
      </div>
      <div className="featured-card__body">
        <p className="featured-card__meta">
          {post.author} · {formatDate(post.publishedAt)}
        </p>
        <h2 className="featured-card__title">{post.title}</h2>
        <p className="featured-card__excerpt">{post.excerpt}</p>
        <span className="btn-read">Read Article →</span>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card group">
      <div className="post-card__image-wrapper">
        {post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="post-card__image"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>
      <div className="post-card__body">
        <span className="post-card__category">{post.category}</span>
        <h3 className="post-card__title">{post.title}</h3>
        <p className="post-card__excerpt">{post.excerpt}</p>
        <div className="post-card__footer">
          <span className="post-card__author">{post.author}</span>
          <span className="post-card__date">{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;


  return (
    <div className="blog-page">


      <main className="blog-main">
        {/* Hero */}
        <section className="blog-hero" style={{ position: "relative" }}>
          <Image 
            src="/blog_hero_sports.png" 
            alt="Sports Action Collage" 
            fill 
            style={{ objectFit: "cover", opacity: 0.15, pointerEvents: "none" }} 
            priority
          />
          <div className="blog-hero__inner" style={{ position: "relative", zIndex: 1 }}>
            <div className="blog-hero__eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <Newspaper size={16} /> Betting Insights
            </div>
            <h1 className="blog-hero__title">Bet Smarter, Win More</h1>
            <p className="blog-hero__sub">
              Expert strategies, odds breakdowns, and insider tips from
              professional sports bettors.
            </p>
          </div>
        </section>

        <div className="blog-content">
          {/* Featured post */}
          {featured && (
            <section className="section-featured">
              <h2 className="section-label">Featured</h2>
              <FeaturedCard post={featured} />
            </section>
          )}

          {/* All other posts */}
          {rest.length > 0 && (
            <section className="section-grid">
              <h2 className="section-label">Latest Articles</h2>
              <div className="post-grid">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {posts.length === 0 && (
            <div className="empty-state">
              <p>No posts yet. Head to the admin portal to create your first post.</p>
              <Link href="/admin" className="btn-admin mt-4">
                Go to Admin
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
