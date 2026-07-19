/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { ArrowLeft, Home, RefreshCw } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import "react-photo-view/dist/react-photo-view.css";
import { Toaster } from "@/components/ui/sonner";
import appCss from "@/styles/globals.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      { title: "Xchan" },
      {
        name: "description",
        content: "A 4chan-like interface with X UI and nested replies",
      },
      { property: "og:site_name", content: "Xchan" },
      { property: "og:title", content: "Xchan" },
      {
        property: "og:description",
        content: "A 4chan-like interface with X UI and nested replies",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      {
        property: "og:image",
        content: "https://x-chan.org/opengraph-image.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
    ],
    scripts: [
      {
        src: "https://plausible.x-chan.org/js/script.file-downloads.outbound-links.tagged-events.js",
        defer: true,
        "data-domain": "x-chan.org",
      },
    ],
  }),
  errorComponent: GlobalError,
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}

function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl mb-4">💥</div>

        <h1 className="text-3xl font-bold text-red-500">Application Error</h1>

        <p className="text-gray-400">
          Something went wrong with the application. This error has been logged.
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
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <Home className="h-4 w-4" />
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
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
                  to="/"
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
