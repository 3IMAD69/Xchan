import ThreadCard from "@/components/thread-card";
import { chan } from "@/lib/4chan-client";
import { htmlToText } from "html-to-text";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// Extract the threads loading logic into a separate component
async function ThreadsList({ board }: { board: string }) {
  const { data: Threads, error } = await chan.getCatalog(board);

  if (error) {
    return (
      <div className="py-8 text-center text-red-500">
        The board /{board}/ was not found.
      </div>
    );
  }

  //html to text for Threads
  Threads.forEach((thread) => {
    thread.threads.forEach((th) => {
      if (th.com) {
        th.com = htmlToText(th.com, {
          wordwrap: false,
          preserveNewlines: true,
        });
      }
      if (th.sub) {
        th.sub = htmlToText(th.sub, {
          wordwrap: false,
          preserveNewlines: true,
        });
      }
    });
  });

  return (
    <div className="space-y-1">
      {Threads.map((thread) =>
        thread.threads.map((th) => (
          <ThreadCard key={th.no} thread={th} boardId={board} />
        ))
      )}
    </div>
  );
}

// Loading component
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

export default async function BoardPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board } = await params;

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
              <h1 className="font-bold text-xl">Home - /{board}/</h1>
            </div>
          </div>
          <Suspense fallback={<ThreadsLoading />}>
            <ThreadsList board={board} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

// If you have generateMetadata function, update it too:
export async function generateMetadata({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board } = await params;

  return {
    title: `/${board}/ - Xchan`,
    description: `View threads on the /${board}/ board`,
  };
}
