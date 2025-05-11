import Loading from "@/components/loading"
import ThreadList from "@/components/thread-list"
import { chan } from "@/lib/4chan-client"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"



export default async function BoardPage(
  {
    params,
  }: {
    params: Promise<{  board : string }>
  }
) {
  const { board } = await params
  const {data : Threads , error } = await chan.getCatalog(board);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="sticky top-0 z-10 border-b border-gray-800 bg-black p-4">
          <div className="mx-auto flex max-w-4xl items-center">
            <Link href="/" className="mr-4 rounded-full p-2 hover:bg-gray-800">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">Board not found</h1>
          </div>
        </header>

        <main className="mx-auto max-w-4xl p-4">
          <div className="py-8 text-center text-red-500">The board /{board}/ was not found.</div>
        </main>
      </div>
    )
  }

  //html to text for Threads

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <header className="sticky top-0 z-10 border-b border-gray-800 bg-black p-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4 rounded-full p-2 hover:bg-gray-800">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl font-bold">
              /{board}/ - {"batwenes biik"}
            </h1>
          </div>
        </div>
      </header> */}

      {/* <main className="mx-auto max-w-4xl p-4">
        <Suspense fallback={<Loading />}>
          <ThreadList Threads={Threads} boardId={board}/>
        </Suspense>
      </main> */}

      <main className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto border-x border-gray-800">
        <div className="sticky top-0 z-10 backdrop-blur-md bg-black/80 border-b border-gray-800 p-4">
          <h1 className="font-bold text-xl">Home</h1>
        </div>
        <Suspense fallback={<Loading />}>
          <ThreadList Threads={Threads} boardId={board}/>
        </Suspense>

      </div>
    </main>
    </div>
  )
}
