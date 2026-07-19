import {
  Link,
  createFileRoute,
  useParams,
} from "@tanstack/react-router";
import ThreadCard from "@/components/thread-card";
import { getCatalog } from "@/lib/chan.functions";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/$board")({
  loader: ({ params }) => getCatalog({ data: { board: params.board } }),
  head: ({ params }) => ({
    meta: [
      { title: `/${params.board}/ - Xchan` },
      {
        name: "description",
        content: `View threads on the /${params.board}/ board`,
      },
    ],
  }),
  pendingComponent: BoardPageLoading,
  pendingMs: 0,
  notFoundComponent: BoardNotFound,
  errorComponent: BoardError,
  component: BoardPage,
});

function BoardPage() {
  const threads = Route.useLoaderData();
  const { board } = Route.useParams();

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
              <h1 className="font-bold text-xl">Home - /{board}/</h1>
            </div>
          </div>
          <div className="space-y-1">
            {threads.map((page) =>
              page.threads.map((th) => (
                <ThreadCard key={th.no} thread={th} boardId={board} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function ThreadsLoading() {
  return (
    <div className="space-y-1">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="border-b border-gray-800 p-4">
            <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-800 rounded w-1/2 mb-2"></div>
            <div className="h-20 bg-gray-800 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BoardPageLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="min-h-screen bg-black text-white">
        <div className="max-w-2xl mx-auto border-x border-gray-800">
          <div className="sticky top-0 z-10 backdrop-blur-md bg-black/80 border-b border-gray-800 p-4">
            <div className="flex items-center">
              <div className="mr-4 rounded-full p-2">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <div className="h-6 bg-gray-800 rounded w-32 animate-pulse"></div>
            </div>
          </div>
          <ThreadsLoading />
        </div>
      </main>
    </div>
  );
}

function BoardNotFound() {
  const { board } = useParams({ strict: false }) as { board?: string };

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
              <h1 className="font-bold text-xl">Board not found</h1>
            </div>
          </div>
          <div className="py-8 text-center text-red-500">
            The board /{board}/ was not found.
          </div>
        </div>
      </main>
    </div>
  );
}

function BoardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Board error:", error);
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
              <h1 className="font-bold text-xl">Error Loading Board</h1>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="max-w-md w-full text-center space-y-6">
              <div className="text-6xl mb-4">⚠️</div>

              <h2 className="text-2xl font-bold text-red-500">
                Something went wrong!
              </h2>

              <p className="text-gray-400">
                This board could not be loaded. The board may not exist or there
                was an error fetching the data.
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
