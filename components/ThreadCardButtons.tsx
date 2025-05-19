"use client";

import type { CatalogThreadPost } from "4chan-ts";
import { Bookmark, MessageCircle, Share } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function ThreadCardButtons({
  thread,
  boardId,
}: {
  thread: CatalogThreadPost;
  boardId: string;
}) {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.href}/thread/${thread.no}`
      );
      toast.success("Thread URL copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy thread URL.");
      console.error("Failed to copy thread URL:", error);
    }
  };

  return (
    <div className="flex items-center justify-between mt-3 max-w-md text-gray-500">
      <Link href={`${boardId}/thread/${thread.no}`}>
        <button className="group flex items-center hover:text-blue-500 cursor-pointer">
          <div className="p-2 rounded-full group-hover:bg-blue-500/10">
            <MessageCircle size={20} />
          </div>
          <span className="text-base ml-1">{thread.replies || 0}</span>
        </button>
      </Link>

      <button
        className={`group flex items-center cursor-pointer`}
        // {bookmarked ? "text-blue-500" : "hover:text-blue-500"}`}
        onClick={() => {
          // setBookmarked((prev) => !prev);
          toast.error("Bookmark feature not implemented yet.");
        }}
      >
        <div
          className={`p-2 rounded-full `}
          // ${bookmarked ? "bg-blue-500/10" : "group-hover:bg-blue-500/10"}`}
        >
          <Bookmark
            size={20}
            // fill={bookmarked ? "currentColor" : "none"}
          />
        </div>
      </button>

      <div className="relative">
        <button
          onClick={handleShare}
          className="group flex items-center hover:text-blue-500 cursor-pointer"
        >
          <div className="p-2 rounded-full group-hover:bg-blue-500/10">
            <Share size={20} />
          </div>
        </button>
      </div>
    </div>
  );
}

export default ThreadCardButtons;
