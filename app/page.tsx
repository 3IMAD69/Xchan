import BoardList from "@/components/board-list";
import { chan } from "@/lib/4chan-client";
import { htmlToText } from "html-to-text";
import PlausibleProvider from 'next-plausible'

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
          <h1 className="text-xl font-bold">4chan Boards</h1>
          <div className="text-sm text-gray-400">
            View-only 4chan with Twitter UI and nested replies
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-4">
        <BoardList boards={data.boards} />
      </main>
    </div>
  );
}
