"use client"

import { CatalogThreadPost } from "4chan-ts"
import { useToast } from "@/hooks/use-toast"
import { Bookmark, LinkIcon, MessageCircle, Share } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ThreadCardProps {
  thread: CatalogThreadPost
  boardId: string
}

export default function ThreadCard({ thread , boardId}: ThreadCardProps) {
  const [showShareOptions, setShowShareOptions] = useState(false)
  const { toast } = useToast()

  // const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true })
  const formattedDate = new Date(thread.time * 1000).toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  const handleShare = () => {
    setShowShareOptions(!showShareOptions)
  }

  const copyThreadLink = () => {
    const threadUrl = `${window.location.origin}/thread/${thread.no}`
    navigator.clipboard.writeText(threadUrl)
    toast({
      title: "Link copied!",
      description: "Thread link has been copied to clipboard",
    })
    setShowShareOptions(false)
  }

  // Format the post content - handle greentext and quotes
  const formatContent = (text: string) => {
    if (!text) return ""

    // Replace >text with greentext styling
    return text.replace(/^&gt;(.+)$/gm, '<span class="text-green-500">$&</span>')
  }

  return (
    <div className="border-b border-gray-800 py-2 px-2 hover:bg-gray-900/50">
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          {thread.tim && thread.ext && (
            <Link href={`${boardId}/thread/${thread.no}`} className="block">
              <div className="w-64 h-64 bg-gray-800 rounded-sm overflow-hidden">
                <Image
                  src={`https://i.4cdn.org/${boardId}/${thread.tim}${thread.ext}`}
                  alt="Thread image"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          )}
          {!thread.tim && (
            <Link href={`${boardId}/thread/${thread.no}`} className="block">
              <div className="w-32 h-32 bg-gray-800 rounded-sm flex items-center justify-center text-gray-500">
                No Image
              </div>
            </Link>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center text-sm mb-1">
            <span className="text-green-500 font-medium">Anonymous</span>
            <span className="text-gray-500 mx-1">{formattedDate}</span>
            <span className="text-gray-500">No.{thread.no}</span>
            {thread.sub && <span className="ml-2 text-gray-300 font-semibold">{thread.sub}</span>}
          </div>

          <Link href={`${boardId}/thread/${thread.no}`} className="block">
            <div
              className="text-sm whitespace-pre-wrap break-words text-gray-200"
              dangerouslySetInnerHTML={{
                __html: formatContent(thread.com || ""),
              }}
            />
          </Link>

          <div className="mt-2 flex items-center text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <MessageCircle size={14} />
              <span>{thread.replies || 0} replies</span>
            </div>

            <div className="mx-2">•</div>

            <div className="flex items-center gap-1">
              <span>{thread.images || 0} images</span>
            </div>

            <div className="flex-1"></div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 hover:text-gray-300">
                <Bookmark size={14} />
              </button>

              <div className="relative">
                <button onClick={handleShare} className="flex items-center gap-1 hover:text-gray-300">
                  <Share size={14} />
                </button>

                {showShareOptions && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <button
                        onClick={copyThreadLink}
                        className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-800"
                        role="menuitem"
                      >
                        <LinkIcon size={14} className="mr-2" />
                        Copy thread link
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
