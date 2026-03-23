import { getPostBySlug } from "@/app/lib/posts";
import { notFound } from "next/navigation";
import PostForm from "../../../components/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Convert keywords array to comma-separated string for the form
  const initialData = {
    ...post,
    keywords: (post.keywords || []).join(", "),
    publishedAt: new Date(post.publishedAt).toISOString().slice(0, 16),
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">Edit Post</h1>
      </div>
      <PostForm mode="edit" slug={slug} initialData={initialData} />
    </div>
  );
}
