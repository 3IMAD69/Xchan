import { createFileRoute } from "@tanstack/react-router";
import BoardList from "@/components/board-list";
import { getBoards } from "@/lib/chan.functions";

export const Route = createFileRoute("/")({
  loader: () => getBoards(),
  component: Home,
});

function Home() {
  const boards = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-black p-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center gap-2">
            <img
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
        <BoardList boards={boards} />
      </main>
    </div>
  );
}
