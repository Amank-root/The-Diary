import React from 'react';
import { Card } from '@/components/ui/card';
import { getPages } from '@/lib/actions/pageAction';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BookmarkSaved from '@/components/shared/BookmarkSaved';

async function Feed({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const allPages = await getPages(id);
  // // console.log(allPages, 'all pages for user', id);
  // // console.log(id)
  // // console.log("All pages:", allPages[0]);
  if (allPages?.length === 0) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
      {/* // @ts-expect-error: i dont know */}
      {allPages &&
        allPages.map((page) => (
          <Card
            key={page.id}
            className="p-0 aspect-auto overflow-hidden group cursor-pointer border-0 shadow-sm"
          >
            <div className="relative w-full h-full">
              <Link href={`/page/${page.id}`}>
                <Image
                  width={400}
                  height={600}
                  src={page.pageImageUrl || 'https://dummyimage.com/210x297'}
                  alt={`page ${page.id}`}
                  className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
              </Link>
              <Link href={`/diary/${page.diaryId}`}>
                <div className="absolute top-3 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                  <span className="text-sm text-accent dark:text-white">
                    {page.diary.title}
                  </span>
                </div>
              </Link>
              <div className="absolute flex w-full items-center justify-between bottom-5 px-4">
                {/* <Link href={`/profile/${page.diary.user.username}`} className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"> */}
                <Link
                  href={`/profile/${page.diary.user.username}`}
                  className="flex items-center gap-2"
                >
                  {/* <div> */}
                  <Image
                    src={
                      page.diary.user.image || 'https://dummyimage.com/210x297'
                    }
                    alt={`Profile picture of ${page.diary.user.username}`}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <h3 className="text-sm md:text-md font-light mix-blend-difference text-white">
                    {page.diary.user.username}
                  </h3>
                  {/* </div> */}
                </Link>
                <BookmarkSaved />
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
}

export default Feed;
