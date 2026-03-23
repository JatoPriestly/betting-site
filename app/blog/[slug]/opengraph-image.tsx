import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/app/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "Dice Bets Blog";
  const category = post?.category ?? "";
  const author = post?.author ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1040 100%)",
          padding: "60px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Decorative accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
          }}
        />

        {category && (
          <div
            style={{
              display: "flex",
              background: "rgba(124,58,237,0.3)",
              color: "#a78bfa",
              fontSize: 20,
              fontWeight: 600,
              padding: "8px 20px",
              borderRadius: 999,
              alignSelf: "flex-start",
              marginBottom: 24,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {category}
          </div>
        )}

        <div
          style={{
            fontSize: title.length > 60 ? 44 : 54,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: 24,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            🎲
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#e2e8f0", fontSize: 18, fontWeight: 600 }}>
              {author || "Dice Bets"}
            </span>
            <span style={{ color: "#94a3b8", fontSize: 16 }}>
              dicebets.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
