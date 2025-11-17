"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold mb-4">
        Une erreur s&apos;est produite !
      </h2>
      <p className="mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-black text-white px-4 py-2 rounded-full shadow-inner hover:bg-gray-800 transition-colors"
      >
        Réessayer
      </button>
    </main>
  );
}
