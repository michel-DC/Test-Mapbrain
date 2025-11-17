"use client";

import Link from "next/link";
import { useState } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function PostDetails({ post }: { post: Post }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/posts"
          className="bg-black text-white px-4 py-2 rounded-full shadow-inner hover:bg-gray-800 transition-colors"
        >
          Retour à la liste
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded-full shadow-inner hover:bg-gray-800 transition-colors"
        >
          Voir le JSON
        </button>
      </div>
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {post.body}
        </p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-4">Raw JSON</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(post, null, 2)}
            </pre>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-black text-white px-4 py-2 rounded-full shadow-inner hover:bg-gray-800 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
