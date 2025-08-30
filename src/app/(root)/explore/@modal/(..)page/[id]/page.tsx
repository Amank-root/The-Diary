import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import BookmarkSaved from '@/components/shared/BookmarkSaved';
import RouteBack from './RouteBack';
import { getPageById } from '@/lib/actions/pageAction';


export default async function PageModal({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  const page = await getPageById(id);
  console.log(page)

  if (!page) return null; // Or redirect/notFound()

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      {/* Background overlay - clicking closes modal */}
      <Link href="/explore" className="absolute inset-0" />
      
      {/* Modal content */}
      <div className="relative flex items-center justify-center min-h-full p-4">
        <div className="relative w-full max-w-sm aspect-[2/3] bg-white rounded-lg overflow-hidden shadow-2xl group">
          
          {/* Main image */}
          <div className="relative w-full h-full">
            <Image
              width={400}
              height={600}
              src={page.pageImageUrl || "https://dummyimage.com/400x600"}
              alt={`Page ${page.id}`}
              className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
          </div>

          {/* Top-left diary title */}
          <Link href={`/diary/${page.diaryId}`}>
            <div className="absolute top-3 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-sm text-white">
                {page.diary.title}
              </span>
            </div>
          </Link>

          {/* Bottom info bar */}
          <div className="absolute bottom-5 left-0 right-0 px-4 flex items-center justify-between">
            <Link href={`/profile/${page.diary.user.username}`} className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={page.diary.user.image || "https://dummyimage.com/100x100"} alt={page.diary.user.username || ""} />
                <AvatarFallback>{page.diary.user.username}</AvatarFallback>
              </Avatar>
              <h3 className="text-md font-light text-white">
                {page.diary.user.username}
              </h3>
            </Link>
            <BookmarkSaved />
          </div>

          {/* Close Button */}
          <RouteBack />
        </div>
      </div>
    </div>
  );
}
