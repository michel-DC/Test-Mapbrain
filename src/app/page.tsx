import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex flex-col">
        <h1 className="text-4xl font-bold mb-8">
          Bienvenue sur le test technique MapBrain
        </h1>
        <Link
          href="/posts"
          className="bg-black text-white px-6 py-3 rounded-full shadow-inner hover:bg-gray-800 transition-colors"
        >
          Acceder à la page de post
        </Link>
      </div>
    </main>
  );
}
