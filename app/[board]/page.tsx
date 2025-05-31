import ThreadCard from "@/components/thread-card";
import { chan } from "@/lib/4chan-client";
import { htmlToText } from "html-to-text";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: { board: string };
}) {
  const { board } = params;

  return {
    title: `/${board}/ - Xchan`,
    description: `View threads on the /${board}/ board`,
  };
}

export default async function BoardPage({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  const { board } = await params;
  const { data: Threads, error } = await chan.getCatalog(board);
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="sticky top-0 z-10 border-b border-gray-800 bg-black p-4">
          <div className="mx-auto flex max-w-4xl items-center">
            <Link href="/" className="mr-4 rounded-full p-2 hover:bg-gray-800">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">Board not found</h1>
          </div>
        </header>

        <main className="mx-auto max-w-4xl p-4">
          <div className="py-8 text-center text-red-500">
            The board /{board}/ was not found.
          </div>
        </main>
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
    <div className="min-h-screen bg-black text-white">
      <main className="min-h-screen bg-black text-white">
        <div className="max-w-2xl mx-auto border-x border-gray-800">
          <div className="sticky top-0 z-10 backdrop-blur-md bg-black/80 border-b border-gray-800 p-4">
            <h1 className="font-bold text-xl">Home - /{board}/</h1>
          </div>
          <div className="space-y-1">
            {Threads.map((thread) =>
              thread.threads.map((th) => (
                <ThreadCard key={th.no} thread={th} boardId={board} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
