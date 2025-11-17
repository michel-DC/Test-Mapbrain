import PostsList from './PostsList';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { next: { tags: ['posts'] } });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default async function PostsPage() {
  const posts: Post[] = await getPosts();

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <PostsList posts={posts} />
    </main>
  );
}
