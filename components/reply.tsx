"use client";

import type { Thread } from "4chan-ts";
import { Bookmark, MessageCircle, Share } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PhotoView } from "react-photo-view";
import { toast } from "sonner";
import { formatContent } from "./formatContent";
import { Overlay } from "./Overlay";
import VidNotSupported from "./VidNotSupported";

// Add this function to scroll to elements
const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
    });
    // Add a temporary highlight effect
    element.classList.add("bg-yellow-800/20");
    setTimeout(() => {
      element.classList.remove("bg-yellow-800/20");
    }, 2000);
  }
};

interface ReplyProps {
  reply: Thread;
  // threadId?: number
  boardId: string;
}

export default function Reply({ reply, boardId }: ReplyProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [imageURL, setImageURL] = useState(``);

  useEffect(() => {
    // Check if URL hash matches this reply
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === `#${reply.no}`) {
        console.log(`Scrolling to reply ${reply.no}`);
        const element = document.getElementById(`${reply.no}`);
        if (element) {
          element.classList.add("bg-yellow-800/20");
          setTimeout(() => {
            element.classList.remove("bg-yellow-800/20");
          }, 2000);
        }
      }
    }
  }, [reply.no]);

  if (reply.resto == 0)
    // op , dont want it in comment ,
    return;

  const formattedDate = new Date(reply.time * 1000).toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Create a handler for clicking on content in the overlay
  const handleOverlayClick = () => {
    scrollToElement(`${reply.no}`);
  };

  const handleShareReply = async () => {
    let replyURL = `${window.location.href}`;
    if (replyURL.includes("#")) {
      replyURL = replyURL.split("#")[0];
    }
    try {
      await navigator.clipboard.writeText(`${replyURL}#${reply.no}`);
      toast.success("reply copied to clipboard!");
      console.log(`${replyURL}${reply.no}`);
    } catch (error) {
      toast.error("Failed to copy reply .");
      console.error("Failed to copy reply:", error);
    }
  };

  const handleSaveReply = () => {
    toast.warning("Bookmark feature not implemented yet.");
  };

  return (
    <div
      className={`border-l border-gray-800 pl-3 mt-3 transition-colors duration-500`}
      id={`${reply.no}`}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold">
            {reply.id ? reply.id.substring(0, 2) : "A"}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center text-sm mb-1">
            <span className="text-green-500 font-medium">Anon</span>
            <span className="text-gray-500 mx-1">{formattedDate}</span>
            <span className="text-gray-500">No.{reply.no}</span>
          </div>

          {formatContent(reply.com)}

          {reply.tim && reply.ext && (
            <>
              {[".webm", ".mp4"].includes(reply.ext.toLowerCase()) ? (
                <VidNotSupported
                  ext={reply.ext}
                  tim={reply.tim}
                  boardId={boardId}
                />
              ) : (
                <div className="mt-2 rounded-md overflow-hidden cursor-pointer">
                  {imageURL != "" ? (
                    <PhotoView
                      key={reply.no}
                      src={imageURL}
                      overlay={
                        <Overlay>
                          <div onClick={handleOverlayClick}>
                            {reply.com
                              ? reply.com.length > 200
                                ? reply.com.slice(0, 200) + "..."
                                : reply.com
                              : reply.filename + reply.ext}
                          </div>
                        </Overlay>
                      }
                    >
                      <Image
                        src={`https://i.4cdn.org/${boardId}/${reply.tim}${reply.ext}`}
                        alt={`Reply image ${reply.ext}`}
                        width={600}
                        height={400}
                        className="max-h-[400px] w-auto object-contain"
                      />
                    </PhotoView>
                  ) : (
                    <Image
                      src={`https://i.4cdn.org/${boardId}/${reply.tim}${reply.ext}`}
                      alt={`Reply image ${reply.ext}`}
                      width={600}
                      height={400}
                      className="max-h-[400px] w-auto object-contain"
                      onLoad={(e) => {
                        setImageURL(e.currentTarget.src);
                      }}
                      loading="eager"
                      // priority={false}
                    />
                  )}
                </div>
              )}
            </>
          )}

          <div className="mt-3 flex items-center justify-between text-gray-500">
            <button
              onClick={() => setShowReplies((prev) => !prev)}
              className="flex items-center gap-1 hover:text-gray-300 hover:cursor-pointer"
            >
              <MessageCircle size={18} />
              <span>{reply.replies_arr.length || 0}</span>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={handleSaveReply}
                className="flex items-center gap-1 cursor-pointer hover:text-gray-300"
              >
                <Bookmark size={18} />
              </button>

              <div className="relative">
                <button
                  onClick={handleShareReply}
                  className="flex items-center gap-1 cursor-pointer hover:text-gray-300"
                >
                  <Share size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showReplies && reply.replies_arr.length > 0 && (
        <div className="ml-6 mt-3">
          {reply.replies_arr.map((nestedReply) => (
            <Reply key={nestedReply.no} reply={nestedReply} boardId={boardId} />
          ))}
        </div>
      )}
    </div>
  );
}
