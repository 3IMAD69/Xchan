"use client";

import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Thread error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="min-h-screen bg-black text-white">
        <div className="max-w-2xl mx-auto border-x border-gray-800">
          <div className="sticky top-0 z-10 backdrop-blur-md bg-black/80 border-b border-gray-800 p-4">
            <div className="flex items-center">
              <Link
                href="/"
                className="mr-4 rounded-full p-2 hover:bg-gray-800"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="font-bold text-xl">Error Loading Thread</h1>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="max-w-md w-full text-center space-y-6">
              <div className="text-6xl mb-4">⚠️</div>

              <h2 className="text-2xl font-bold text-red-500">
                Something went wrong!
              </h2>

              <p className="text-gray-400">
                This thread could not be loaded. It may have been deleted,
                archived, or there was an error fetching the data.
              </p>

              {error.message && (
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                  <p className="text-sm text-gray-500 font-mono break-words">
                    {error.message}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try again
                </button>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go back home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
