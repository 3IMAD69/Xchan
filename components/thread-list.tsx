import type { Catalog } from "4chan-ts";
import ThreadCard from "@/components/thread-card";

interface ThreadListProps {
  Threads: Catalog;
  boardId: string;
}

export default function ThreadList({ Threads, boardId }: ThreadListProps) {
  return (
    <div className="space-y-1">
      {Threads.map((thread) =>
        thread.threads.map((th) => (
          <ThreadCard key={th.no} thread={th} boardId={boardId} />
        ))
      )}
    </div>
  );
}
