import React from 'react'
import { Card } from '@/components/ui/card';
import { getDiaries } from '@/lib/actions/diaryAction';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';

async function DiaryProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const diaries = await getDiaries(id)

    if (diaries && diaries.length === 0) {
        return <p>No diaries found.</p>;
    }

    return (
        <div className="grid grid-cols-3 gap-1 md:gap-4">
            {diaries && diaries.map((diary) => (
                <Card key={diary.slug} className="p-0 aspect-auto overflow-hidden group cursor-pointer border-0 shadow-sm">
                    <div className="relative w-full h-full">
                        <Link href={`/diary/${diary.slug}`}>
                            <img
                                src={diary.diaryCoverImage || "https://dummyimage.com/210x297"}
                                alt={`diary ${diary.slug}`}
                                className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                            />
                        </Link>

                        <div className="absolute top-3 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                            {/* <Image
                                  src={diary.avatar}
                                  alt="Author avatar"
                                  width={40}
                                  height={40}
                                  className="rounded-full border-2 border-white shadow-md"
                                /> */}
                            {/* DATE diaryED ON */}
                            <span className="text-sm text-accent dark:text-white">{diary.createdAt.toLocaleDateString()}</span>
                        </div>
                        <div className="absolute flex w-full justify-between bottom-5 px-4">
                            <div>
                                {/* title */}
                                <h3 className="text-lg font-semibold mix-blend-difference text-white">{diary.title}</h3>
                            </div>
                            <Bookmark className="w-6 h-6 text-white drop-shadow-md fill-white" />
                        </div>
                        {/* <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="flex items-center gap-4 text-white">
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm font-semibold">{post.mood}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-sm font-semibold">{post.date}</span>
                                  </div>
                                </div>
                              </div> */}
                    </div>
                </Card>
                // <Card key={diary.id} className="p-0 aspect-auto overflow-hidden group cursor-pointer border-0 shadow-sm">
                //     <div className="relative w-full h-full">
                //         <img
                //             src={diary.diaryCoverImage || "https://dummyimage.com/210x297"}
                //             alt={`diary ${diary.id}`}
                //             className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                //         />
                //         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                //             <div className="flex items-center gap-4 text-white">
                //                 <div className="flex items-center gap-1">
                //                     <span className="text-sm font-semibold">{diary.types}</span>
                //                 </div>
                //                 <div className="flex items-center gap-1">
                //                     <span className="text-sm font-semibold">{diary.title}</span>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </Card>
            ))}
        </div>
    )
}

export default DiaryProfilePage