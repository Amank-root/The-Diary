import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from 'lucide-react'; // Or any icon lib


// TODO: Implement intercepting route to just show as a modal on explore page (just as a overlay)

export default async function PageModal({ params }: { params: Promise<{ id: string }> }) {
  // const page = await getPageById(params.pageId);
  const {id} = await params;
  const page = {
    id: id,
    pageImageUrl: "https://dummyimage.com/400x600",
    diary: {
      title: "Sample Diary Title",
      user: {
        username: "SampleUser",
        image: "https://dummyimage.com/100x100"
      }
    },
    diaryId: "sample-diary-id"
  }

  if (!page) return null; // Or redirect/notFound()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-sm aspect-[2/3] bg-white rounded-lg overflow-hidden shadow-lg group">

        {/* Main image with overlay */}
        <Link href={`/page/${page.id}`} className="relative w-full h-full block">
          <Image
            width={400}
            height={600}
            src={page.pageImageUrl || "https://dummyimage.com/400x600"}
            alt={`Page ${page.id}`}
            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
        </Link>

        {/* Top-left diary title */}
        <Link href={`/diary/${page.diaryId}`}>
          <div className="absolute top-3 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-sm text-accent dark:text-white">
              {page.diary.title}
            </span>
          </div>
        </Link>

        {/* Bottom info bar */}
        <div className="absolute bottom-5 left-0 right-0 px-4 flex items-center justify-between">
          <Link href={`/profile/${page.diary.user.username}`} className="flex items-center gap-2">
            <Image
              src={page.diary.user.image || "https://dummyimage.com/100x100"}
              alt={page.diary.user.username}
              width={40}
              height={40}
              className="rounded-full"
            />
            <h3 className="text-md font-light mix-blend-difference text-white">
              {page.diary.user.username}
            </h3>
          </Link>
          <Bookmark className="w-6 h-6 text-white drop-shadow-md fill-white" />
        </div>

        {/* Optional: Close Button (if needed) */}
        <Link
          href={`/profile/${id}`}
          className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1 hover:bg-black/70 transition"
        >
          ✕
        </Link>
      </div>
    </div>
  );
}
