"use client";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="min-h-screen bg-black text-white">
        <div className="max-w-2xl mx-auto border-x border-gray-800">
          <div className="flex flex-col items-center justify-center py-16 px-4 min-h-screen">
            <div className="max-w-md w-full text-center space-y-6">
              <div className="text-6xl mb-4">404</div>

              <h1 className="text-3xl font-bold">Page Not Found</h1>

              <p className="text-gray-400">
                The page you are looking for doesn&apos;t exist or has been
                moved.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Home className="h-4 w-4" />
                  Go home
                </Link>

                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go back
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
