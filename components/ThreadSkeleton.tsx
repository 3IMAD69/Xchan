import { ArrowLeft, Bookmark, MessageCircle, Share } from "lucide-react";

export default function ThreadSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-black p-4">
        <div className="mx-auto flex max-w-4xl items-center">
          <div className="mr-4 rounded-full p-2 hover:bg-gray-800">
            <ArrowLeft className="h-5 w-5" />
          </div>
          <div className="h-6 bg-gray-700 rounded w-48 animate-pulse"></div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-4xl p-4">
        <div className="space-y-6">
          {/* Original post skeleton - ENHANCED BIGGER SIZE */}
          <div className="border-b border-gray-800 pb-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-14 w-14 rounded-full bg-gray-800 animate-pulse"></div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center text-base mb-2">
                  <div className="h-5 bg-gray-700 rounded w-32 animate-pulse"></div>
                  <div className="h-5 bg-gray-700 rounded w-24 mx-3 animate-pulse"></div>
                  <div className="h-5 bg-gray-700 rounded w-20 animate-pulse"></div>
                </div>

                <div className="mt-4">
                  <div className="h-5 bg-gray-700 rounded w-full animate-pulse"></div>
                  <div className="h-5 bg-gray-700 rounded w-5/6 mt-3 animate-pulse"></div>
                  <div className="h-5 bg-gray-700 rounded w-4/6 mt-3 animate-pulse"></div>
                  <div className="h-5 bg-gray-700 rounded w-full mt-3 animate-pulse"></div>
                </div>

                <div className="mt-6">
                  <div className="aspect-video w-full max-w-lg bg-gray-700 rounded animate-pulse"></div>
                </div>

                <div className="mt-4 flex items-center justify-between text-gray-500">
                  <div className="flex items-center gap-2">
                    <MessageCircle size={20} />
                    <div className="h-5 bg-gray-700 rounded w-8 animate-pulse"></div>
                  </div>

                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2">
                      <Bookmark size={20} />
                    </button>
                    <button className="flex items-center gap-2">
                      <Share size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Replies section skeleton - KEPT SMALLER */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Replies</h2>

            <div className="space-y-3">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-shrink-0">
                      <div className="h-7 w-7 rounded-full bg-gray-800 animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <div className="h-3 bg-gray-700 rounded w-16 animate-pulse"></div>
                        <div className="h-3 bg-gray-700 rounded w-20 ml-2 animate-pulse"></div>
                      </div>
                      <div className="h-3 bg-gray-700 rounded w-full mt-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-700 rounded w-4/5 mt-1 animate-pulse"></div>
                      {index % 2 === 0 && (
                        <div className="mt-2 aspect-video w-48 bg-gray-700 rounded animate-pulse"></div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
