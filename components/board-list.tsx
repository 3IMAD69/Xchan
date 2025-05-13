"use client";

import type { Board } from "4chan-ts";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BoardList({ boards }: { boards: Board[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Available Boards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {boards.map((board) => (
          <Link
            key={board.board}
            href={`/${board.board}`}
            className="border border-gray-800 rounded-lg p-4 hover:bg-gray-900 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  /{board.board}/ - {board.title}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {board.meta_description}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-500" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
