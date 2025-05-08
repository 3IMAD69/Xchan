"use client"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { MessageCircle, Bookmark, Share } from "lucide-react"
import Reply from "@/components/reply"
import { fetchNestedReplies } from "@/lib/api"
import Link from "next/link"

interface ThreadProps {
  thread: any
  isReply?: boolean
  depth?: number
  maxDepth?: number
}

export default function Thread({ thread, isReply = false, depth = 0, maxDepth = 20 }: ThreadProps) {
  const [replies, setReplies] = useState<any[]>([])
  const [showReplies, setShowReplies] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLoadReplies = async () => {
    if (replies.length === 0) {
      try {
        setLoading(true)
        const data = await fetchNestedReplies(thread.no)
        setReplies(data)
      } catch (err) {
        console.error("Failed to load replies", err)
      } finally {
        setLoading(false)
      }
    }
    setShowReplies(!showReplies)
  }

  const timestamp = new Date(thread.time * 1000)
  const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true })

  // Format the post content - handle greentext and quotes
  const formatContent = (text: string) => {
    if (!text) return ""

    // Replace >text with greentext styling
    return text.replace(/^&gt;(.+)$/gm, '<span class="text-green-500">$&</span>')
  }

  return (
    <div className={`border-b border-gray-800 pb-3 ${isReply ? "ml-6 mt-3 border-l border-gray-800 pl-3" : ""}`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold">
            {thread.id ? thread.id.substring(0, 2) : "A"}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <Link href={`/thread/${thread.no}`} className="block hover:bg-gray-900 rounded-md -m-1 p-1">
            {thread.sub && <div className="font-bold text-lg">{thread.sub}</div>}

            <div className="flex items-center gap-1">
              <span className="font-bold">{thread.name || "Anonymous"}</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">{timeAgo}</span>
            </div>

            <div
              className="mt-1 whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{
                __html: formatContent(thread.com || ""),
              }}
            />

            {thread.tim && thread.ext && (
              <div className="mt-2 rounded-2xl overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=400&width=600`}
                  alt="Thread image"
                  width={600}
                  height={400}
                  className="max-h-[400px] w-auto object-contain"
                />
              </div>
            )}
          </Link>

          <div className="mt-3 flex items-center justify-between text-gray-500">
            <button onClick={handleLoadReplies} className="flex items-center gap-1 hover:text-gray-300">
              <MessageCircle size={18} />
              <span>{thread.replies || 0}</span>
            </button>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 hover:text-gray-300">
                <Bookmark size={18} />
              </button>

              <button className="flex items-center gap-1 hover:text-gray-300">
                <Share size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && <div className="ml-12 mt-3 text-gray-500">Loading replies...</div>}

      {showReplies && replies.length > 0 && depth < maxDepth && (
        <div className="ml-6 mt-3">
          {replies.map((reply) => (
            <Reply key={reply.no} reply={reply} depth={depth + 1} maxDepth={maxDepth} />
          ))}
        </div>
      )}
    </div>
  )
}
