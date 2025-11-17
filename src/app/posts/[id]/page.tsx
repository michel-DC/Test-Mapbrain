import PostDetails from "./PostDetails";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }
  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const post: Post = await getPost(resolvedParams.id);

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <PostDetails post={post} />
    </main>
  );
}
