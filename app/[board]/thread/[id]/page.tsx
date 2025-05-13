import Loading from "@/components/loading";
import ThreadDetail from "@/components/thread-detail";
import { chan } from "@/lib/4chan-client";
import { FormatThreadToNestedComment } from "@/lib/4chan-utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: number; board: string }>;
}) {
  const { id, board } = await params;
  const { data, error } = await chan.getThread(board, id);
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="sticky top-0 z-10 border-b border-gray-800 bg-black p-4">
          <div className="mx-auto flex max-w-4xl items-center">
            <Link
              href={`/${board}`}
              className="mr-4 rounded-full p-2 hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">Thread not found</h1>
          </div>
        </header>
        <main className="mx-auto max-w-4xl p-4">
          <div className="py-8 text-center text-red-500">
            {"Thread not found"}
          </div>
        </main>
      </div>
    );
  }
  const ThreadWithNestedComments = await FormatThreadToNestedComment(data);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-black p-4">
        <div className="mx-auto flex max-w-4xl items-center">
          <Link
            href={`/${board}`}
            className="mr-4 rounded-full p-2 hover:bg-gray-800"
            prefetch={true}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">
            {data.posts[0].semantic_url &&
              data.posts[0].semantic_url.replaceAll("-", " ")}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-4">
        <Suspense fallback={<Loading />}>
          <ThreadDetail
            op={ThreadWithNestedComments[0]}
            replies={ThreadWithNestedComments}
            boardId={board}
          />
        </Suspense>
      </main>
    </div>
  );
}
