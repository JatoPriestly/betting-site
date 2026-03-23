import PostForm from "../../components/PostForm";

export default function NewPostPage() {
  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <h1 className="admin-page__title">New Post</h1>
      </div>
      <PostForm mode="create" />
    </div>
  );
}
