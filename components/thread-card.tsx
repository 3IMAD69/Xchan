"use client"

import type { CatalogThreadPost } from "4chan-ts"
import { Bookmark, Hash, MessageCircle, Share } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ThreadCardProps {
  thread: CatalogThreadPost
  boardId: string
}

export default function ThreadCard({ thread, boardId }: ThreadCardProps) {
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  // If thread is undefined, return a placeholder or null
  if (!thread) {
    return (
      <div className="border-b border-gray-800 px-4 py-4 hover:bg-gray-900/30 transition-colors">
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
              <Hash size={18} className="text-gray-600" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-5 bg-gray-800 rounded w-3/4 mb-3"></div>
            <div className="h-24 bg-gray-800 rounded w-full mb-4"></div>
            <div className="flex items-center justify-between mt-3 max-w-md text-gray-500">
              {[1, 2].map((i) => (
                <div key={i} className="h-8 w-16 bg-gray-800 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Format date like 05/10/25, 19:34
  const formattedDate = new Date(thread.time * 1000)
    .toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "")

  const handleShare = () => {
    setShowShareOptions(!showShareOptions)
  }

  const copyThreadLink = () => {
    // Implementation for copying link
    setShowShareOptions(false)
  }

  const toggleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  return (
    <div className="border-b border-gray-800 px-4 py-4  hover:bg-gray-900/30 transition-colors">
      <div className="flex gap-3">
        {/* Board icon/avatar placeholder */}
        <div className="flex-shrink-0 mt-1">
          <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
            <span className="font-bold text-gray-400">/{boardId}/</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-center text-base mb-1.5">
            <span className="text-green-500 font-medium">Anon</span>
            <span className="text-gray-500 mx-1">·</span>
            <span className="text-gray-500">{formattedDate}</span>
            <span className="text-gray-500 mx-1">·</span>
            <span className="text-gray-500">No.{thread.no}</span>
          </div>

          {/* Thread title if available */}
          {thread.sub && <div className="text-lg font-bold text-white mb-1.5">{thread.sub}</div>}

          {/* Thread content */}
          <Link href={`${boardId}/thread/${thread.no}`} className="block mb-2">
            <span
              className="text-base whitespace-pre-wrap break-words text-white leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: thread.com?.slice(0, 500) || "",
              }}
            />
          </Link>

          {/* Thread image */}
          {thread.tim && thread.ext && (
            <Link href={`${boardId}/thread/${thread.no}`} className="block mb-3">
              <div className="rounded-2xl overflow-hidden  mt-2">
                <Image
                  src={`https://i.4cdn.org/${boardId}/${thread.tim}${thread.ext}`}
                  alt="Thread image"
                  width={550}
                  height={350}
                  className="max-w-full  object-contain"
                />
              </div>
            </Link>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-3 max-w-md text-gray-500">
            <button className="group flex items-center hover:text-blue-500">
              <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                <MessageCircle size={20} />
              </div>
              <span className="text-base ml-1">{thread.replies || 0}</span>
            </button>

            <button
              className={`group flex items-center ${bookmarked ? "text-blue-500" : "hover:text-blue-500"}`}
              onClick={toggleBookmark}
            >
              <div className={`p-2 rounded-full ${bookmarked ? "bg-blue-500/10" : "group-hover:bg-blue-500/10"}`}>
                <Bookmark size={20} fill={bookmarked ? "currentColor" : "none"} />
              </div>
            </button>

            <div className="relative">
              <button onClick={handleShare} className="group flex items-center hover:text-blue-500">
                <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                  <Share size={20} />
                </div>
              </button>

              {showShareOptions && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-black ring-1 ring-gray-800 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={copyThreadLink}
                      className="flex items-center w-full px-4 py-3 text-sm text-white hover:bg-gray-800"
                      role="menuitem"
                    >
                      Copy link to thread
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
