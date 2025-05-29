import BoardList from "@/components/board-list";
import { chan } from "@/lib/4chan-client";
import { htmlToText } from "html-to-text";
import Image from "next/image";

export default async function Home() {
  const { data, error } = await chan.getBoards();

  if (error) {
    console.error("Error fetching boards:", error);
    return (
      <main className="mx-auto max-w-4xl p-4">
        <div className="text-red-500">
          <p>Error fetching boards: {error.message}</p>
        </div>
      </main>
    );
  }

  data.boards.forEach((board) => {
    board.meta_description = htmlToText(board.meta_description, {
      wordwrap: false,
      preserveNewlines: true,
    });
  });
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-black p-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/xchan_logo.png"
              alt="XChan Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <h1 className="text-xl font-bold font-mono">Xchan</h1>
          </div>
          <div className="text-sm text-gray-400">
            View-only 4chan with X UI and nested replies
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-4">
        <BoardList boards={data.boards} />
      </main>
    </div>
  );
}
