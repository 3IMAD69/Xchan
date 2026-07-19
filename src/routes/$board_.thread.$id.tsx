import {
  Link,
  createFileRoute,
  useParams,
} from "@tanstack/react-router";
import ThreadDetail from "@/components/thread-detail";
import ThreadSkeleton from "@/components/ThreadSkeleton";
import { getThread } from "@/lib/chan.functions";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/$board_/thread/$id")({
  loader: ({ params }) =>
    getThread({ data: { board: params.board, id: Number(params.id) } }),
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Thread not found" },
          {
            name: "description",
            content: "This thread could not be found or has been deleted.",
          },
        ],
      };
    }

    const { meta } = loaderData;
    const url = `https://x-chan.org/${params.board}/thread/${params.id}`;

    return {
      meta: [
        { title: meta.title },
        { name: "description", content: meta.description },
        { property: "og:title", content: meta.title },
        { property: "og:description", content: meta.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(meta.imageUrl
          ? [
              { property: "og:image", content: meta.imageUrl },
              {
                property: "og:image:width",
                content: String(meta.imageWidth),
              },
              {
                property: "og:image:height",
                content: String(meta.imageHeight),
              },
              { property: "og:image:alt", content: meta.imageAlt },
            ]
          : []),
        {
          name: "twitter:card",
          content: meta.imageUrl ? "summary_large_image" : "summary",
        },
        { name: "twitter:title", content: meta.title },
        { name: "twitter:description", content: meta.description },
        ...(meta.imageUrl
          ? [{ name: "twitter:image", content: meta.imageUrl }]
          : []),
      ],
    };
  },
  pendingComponent: ThreadSkeleton,
  pendingMs: 0,
  notFoundComponent: ThreadNotFound,
  errorComponent: ThreadError,
  component: ThreadPage,
});

function ThreadPage() {
  const { posts, op } = Route.useLoaderData();
  const { board } = Route.useParams();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-black p-4">
        <div className="mx-auto flex max-w-4xl items-center">
          <Link
            to="/$board"
            params={{ board }}
            preload="intent"
            className="mr-4 rounded-full p-2 hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">
            {op.semantic_url && op.semantic_url.replaceAll("-", " ")}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-4">
        <ThreadDetail op={op} replies={posts} boardId={board} />
      </main>
    </div>
  );
}

function ThreadNotFound() {
  const { board } = useParams({ strict: false }) as { board?: string };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-black p-4">
        <div className="mx-auto flex max-w-4xl items-center">
          <Link
            to="/$board"
            params={{ board: board ?? "" }}
            className="mr-4 rounded-full p-2 hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Thread not found</h1>
        </div>
      </header>
      <main className="mx-auto max-w-4xl p-4">
        <div className="py-8 text-center text-red-500">Thread not found</div>
      </main>
    </div>
  );
}

function ThreadError({
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
                to="/"
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
                  to="/"
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
