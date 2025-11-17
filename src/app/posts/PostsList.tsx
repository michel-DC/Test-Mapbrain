"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { revalidatePosts } from "../actions";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function PostsList({ posts }: { posts: Post[] }) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div className="w-full max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Posts</h1>
        <div>
          <button
            onClick={() => revalidatePosts()}
            className="bg-black text-white px-4 py-2 rounded-full shadow-inner hover:bg-gray-800 transition-colors mr-4 cursor-pointer"
          >
            Rafraîchir la liste
          </button>
        </div>
      </div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Rechercher des posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link href={`/posts/${post.id}`} key={post.id}>
            <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 h-full">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {post.body}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
