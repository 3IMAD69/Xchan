import { Thread } from "4chan-ts";
import { Bookmark, MessageCircle, Share } from "lucide-react";
import { toast } from "sonner";

function ThreadSingleButtons({ op }: { op: Thread }) {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.href}/thread/${op.no}`
      );
      toast.success("Thread URL copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy thread URL.");
      console.error("Failed to copy thread URL:", error);
    }
  };
  return (
    <div className="mt-3 flex items-center justify-between text-gray-500">
      <div className="flex items-center gap-1 cursor-pointer">
        <MessageCircle size={18} />
        <span>{op.replies || 0}</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-1 hover:text-gray-300"
          onClick={() => {
            // setBookmarked((prev) => !prev);
            toast.error("Bookmark feature not implemented yet.");
          }}
        >
          <Bookmark size={18} />
        </button>

        <div className="relative">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 cursor-pointer hover:text-gray-300 "
          >
            <Share size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThreadSingleButtons;
