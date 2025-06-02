import SingleThread from "@/components/SingleThread";
import ThreadSkeleton from "@/components/ThreadSkeleton";
import { getCachedThread } from "@/lib/4chan-utils";
import { htmlToText } from "html-to-text";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: number; board: string }>;
}): Promise<Metadata> {
  const { id, board } = await params;

  try {
    const { data, error } = await getCachedThread(board, id);

    if (error || !data.posts[0]) {
      return {
        title: "Thread not found",
        description: "This thread could not be found or has been deleted.",
      };
    }

    const op = data.posts[0];
    const title = op.semantic_url
      ? op.semantic_url.replaceAll("-", " ") + ` - /${board}/ - Xchan`
      : `Thread ${id} on /${board}/`;

    // Convert HTML comment to plain text for description
    const description =
      op.com &&
      htmlToText(op.com, {
        wordwrap: false,
        preserveNewlines: false,
      }).slice(0, 200) + (op.com.length > 200 ? "..." : "");

    // Generate image URL if available
    const imageUrl =
      op.filename && op.ext
        ? `https://i.4cdn.org/${board}/${op.tim}${op.ext}`
        : null;

    return {
      title,
      description: description || `Thread on /${board}/`,
      openGraph: {
        title,
        description: description || `Thread on /${board}/`,
        type: "article",
        url: `/${board}/thread/${id}`,
        ...(imageUrl && {
          images: [
            {
              url: imageUrl,
              width: op.w || 800,
              height: op.h || 600,
              alt: op.filename || "Thread image",
            },
          ],
        }),
      },
      twitter: {
        card: imageUrl ? "summary_large_image" : "summary",
        title,
        description: description || `Thread on /${board}/`,
        ...(imageUrl && { images: [imageUrl] }),
      },
    };
  } catch (error) {
    // Consider using proper logging service in production
    console.error("Error generating thread metadata:", error);
    return {
      title: "Error loading thread",
      description: "An error occurred while loading this thread.",
    };
  }
}

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ id: number; board: string }>;
}) {
  const { id, board } = await params;

  return (
    <Suspense fallback={<ThreadSkeleton />}>
      <SingleThread id={id} board={board} />
    </Suspense>
  );
}
