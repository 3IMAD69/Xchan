"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImagePlus, Send } from "lucide-react"

interface ReplyFormProps {
  threadId?: number
  replyToId?: number
  onReply?: (content: string) => void
}

export default function ReplyForm({ threadId, replyToId, onReply }: ReplyFormProps) {
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim() && onReply) {
      onReply(content)
      setContent("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <div className="relative">
        <Textarea
          placeholder="Post your reply"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[80px] resize-none rounded-2xl border-gray-800 bg-gray-900 p-4 pr-16 text-white"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <Button type="button" size="icon" variant="ghost" className="h-8 w-8 rounded-full">
            <ImagePlus size={18} />
            <span className="sr-only">Add image</span>
          </Button>
          <Button type="submit" size="icon" className="h-8 w-8 rounded-full" disabled={!content.trim()}>
            <Send size={18} />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
      <div className="text-xs text-gray-500">
        {replyToId ? `Replying to post #${replyToId}` : threadId ? `Posting in thread #${threadId}` : ""}
      </div>
    </form>
  )
}
