import SingleThread from "@/components/SingleThread";
import ThreadSkeleton from "@/components/ThreadSkeleton";
import { Suspense } from "react";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: number; board: string }>;
}) {
  const { id, board } = await params;

  return (
    <Suspense fallback={<ThreadSkeleton />}>
      <SingleThread id={id} board={board} />
    </Suspense>
  );
}
