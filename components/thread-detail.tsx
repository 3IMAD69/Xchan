"use client";

import { Thread } from "4chan-ts";
import Reply from "@/components/reply";
import { Bookmark, MessageCircle, Share } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { formatContent } from "./formatContent";

interface ThreadDetailProps {
  op: Thread;
  replies: Thread[];
  boardId: string;
}

export default function ThreadDetail({
  op,
  replies,
  boardId,
}: ThreadDetailProps) {
  const [imageURL, setImageURL] = useState(``);

  // const [showShareOptions, setShowShareOptions] = useState(false)
  // const { toast } = useToast()

  // const timestamp = new Date(op.time * 1000)
  // const timeAgo = formatDistanceToNow(timestamp, { addSuffix: true })
  const formattedDate = new Date(op.time * 1000).toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-800 pb-4">
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-bold">
              {op.id}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center text-sm mb-1">
              <span className="text-green-500 font-medium">Anonymous</span>
              <span className="text-gray-500 mx-1">{formattedDate}</span>
              <span className="text-gray-500">No.{op.no}</span>
              {op.sub && (
                <span className="ml-2 text-gray-300 font-semibold">
                  {op.sub}
                </span>
              )}
            </div>

            <div className="mt-1 whitespace-pre-wrap break-words">
              {formatContent(op.com)}
            </div>

            {op.tim && op.ext && (
              <PhotoProvider
                maskOpacity={0.7}
                toolbarRender={({ onRotate, rotate, onScale, scale }) => {
                  return (
                    <>
                      <svg
                        className="PhotoView-Slider__toolbarIcon"
                        onClick={() => onRotate(rotate + 90)}
                        width="44"
                        height="44"
                        fill="white"
                        viewBox="0 0 768 768"
                      >
                        <path d="M565.5 202.5l75-75v225h-225l103.5-103.5c-34.5-34.5-82.5-57-135-57-106.5 0-192 85.5-192 192s85.5 192 192 192c84 0 156-52.5 181.5-127.5h66c-28.5 111-127.5 192-247.5 192-141 0-255-115.5-255-256.5s114-256.5 255-256.5c70.5 0 135 28.5 181.5 75z" />
                      </svg>
                      <svg
                        className="PhotoView-Slider__toolbarIcon"
                        width="44"
                        height="44"
                        viewBox="0 0 768 768"
                        fill="white"
                        onClick={() => onScale(scale + 0.5)}
                      >
                        <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM415.5 223.5v129h129v63h-129v129h-63v-129h-129v-63h129v-129h63z" />
                      </svg>
                      <svg
                        className="PhotoView-Slider__toolbarIcon"
                        width="44"
                        height="44"
                        viewBox="0 0 768 768"
                        fill="white"
                        onClick={() => onScale(scale - 0.5)}
                      >
                        <path d="M384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM223.5 352.5h321v63h-321v-63z" />
                      </svg>
                    </>
                  );
                }}
              >
                <PhotoView src={imageURL}>
                  <div className="mt-2 rounded-md overflow-hidden cursor-pointer">
                    <Image
                      src={`https://i.4cdn.org/${boardId}/${op.tim}${op.ext}`}
                      alt="op image"
                      width={600}
                      height={400}
                      className="w-full h-auto max-h-[500px] object-contain"
                      onLoad={(e) => {
                        setImageURL(e.currentTarget.src);
                      }}
                    />
                  </div>
                </PhotoView>
              </PhotoProvider>
            )}

            <div className="mt-3 flex items-center justify-between text-gray-500">
              <div className="flex items-center gap-1">
                <MessageCircle size={18} />
                <span>{op.replies || 0}</span>
              </div>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 hover:text-gray-300">
                  <Bookmark size={18} />
                </button>

                <div className="relative">
                  <button
                    // onClick={handleShare}
                    className="flex items-center gap-1 hover:text-gray-300"
                  >
                    <Share size={18} />
                  </button>

                  {/* {showShareOptions && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        <button
                          onClick={copythreadLink}
                          className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-800"
                          role="menuitem"
                        >
                          <LinkIcon size={16} className="mr-2" />
                          Copy thread link
                        </button>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Replies</h2>

        {replies.length === 0 ? (
          <div className="py-4 text-center text-gray-500">No replies yet</div>
        ) : (
          <PhotoProvider
            maskOpacity={0.7}
            toolbarRender={({ onRotate, rotate }) => {
              return (
                <>
                  <svg
                    className="PhotoView-Slider__toolbarIcon"
                    onClick={() => onRotate(rotate + 90)}
                    width="44"
                    height="44"
                    fill="white"
                    viewBox="0 0 768 768"
                  >
                    <path d="M565.5 202.5l75-75v225h-225l103.5-103.5c-34.5-34.5-82.5-57-135-57-106.5 0-192 85.5-192 192s85.5 192 192 192c84 0 156-52.5 181.5-127.5h66c-28.5 111-127.5 192-247.5 192-141 0-255-115.5-255-256.5s114-256.5 255-256.5c70.5 0 135 28.5 181.5 75z" />
                  </svg>
                </>
              );
            }}
            overlayRender={({ overlay, onClose }) => {
              return <div onClick={() => onClose()}>{overlay}</div>;
            }}
            // toolbarRender={({ rotate, onRotate }) => {
            //   return <svg className="PhotoView-Slider__toolbarIcon" onClick={() => onRotate(rotate + 90)} />;
            // }}
          >
            <div className="space-y-1">
              {replies.map((reply) => (
                <Reply
                  key={reply.no}
                  reply={reply}
                  // threadId={op.no}
                  boardId={boardId}
                />
              ))}
            </div>
          </PhotoProvider>
        )}
      </div>
    </div>
  );
}
