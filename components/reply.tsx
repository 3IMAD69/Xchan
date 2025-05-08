"use client"

import { Thread } from "4chan-ts"
import { Bookmark, MessageCircle, Share } from "lucide-react"
import Image from "next/image"

interface ReplyProps {
  reply: Thread
  // threadId?: number
  boardId: string
}

export default function Reply({ reply , boardId }: ReplyProps) {
  // const [showReplies, setShowReplies] = useState(false)

  if (reply.resto == 0) // op , dont want it in comment ,
      return ;

  const formattedDate = new Date(reply.time * 1000).toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })

  // Format the post content - handle greentext and quotes
  const formatContent = (text: string) => {
    if (!text) return ""

    // Replace >text with greentext styling
    return text.replace(/^&gt;(.+)$/gm, '<span class="text-green-500">$&</span>')
  }

  // const replyUrl = `/thread/${threadId || reply.threadId}?reply=${reply.no}&board=${boardId}`

  return (
    <div className="border-l border-gray-800 pl-3 mt-3" id={`reply-${reply.no}`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold">
            {reply.id ? reply.id.substring(0, 2) : "A"}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center text-sm mb-1">
            <span className="text-green-500 font-medium">Anonymous</span>
            <span className="text-gray-500 mx-1">{formattedDate}</span>
            <span className="text-gray-500">No.{reply.no}</span>
          </div>

          <div
            className="mt-1 whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{
              __html: formatContent(reply.com || ""),
            }}
          />

          {reply.tim && reply.ext && (
            <div className="mt-2 rounded-md overflow-hidden">
              <Image
                src={`https://i.4cdn.org/${boardId}/${reply.tim}${reply.ext}`}
                alt="Reply image"
                width={600}
                height={400}
                className="max-h-[400px] w-auto object-contain"
              />
            </div>
          )}

          <div className="mt-3 flex items-center justify-between text-gray-500">
            <button
              // onClick={handleLoadReplies}
              className="flex items-center gap-1 hover:text-gray-300"
              // disabled={depth >= maxDepth}
            >
              <MessageCircle size={18} />
              <span>{reply.replies || 0}</span>
            </button>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 hover:text-gray-300">
                <Bookmark size={18} />
              </button>

              <div className="relative">
                <button
                //  onClick={handleShare}
                  className="flex items-center gap-1 hover:text-gray-300">
                  <Share size={18} />
                </button>

                {/* {showShareOptions && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <button
                        onClick={copyDirectLink}
                        className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-800"
                        role="menuitem"
                      >
                        <LinkIcon size={16} className="mr-2" />
                        Copy direct link
                      </button>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>


      {reply.replies_arr.length > 0 &&  (
        <div className="ml-6 mt-3">
          {reply.replies_arr.map((nestedReply) => (
            <Reply
              key={nestedReply.no}
              reply={nestedReply}
              boardId={boardId}
            />
          ))}
        </div>
      )}
    </div>
  )
}
