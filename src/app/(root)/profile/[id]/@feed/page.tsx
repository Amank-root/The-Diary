import React from 'react'
import { Card } from '@/components/ui/card';
import { getPages } from '@/lib/actions/pageAction';
import Link from 'next/link';
import { Bookmark } from 'lucide-react';



async function Feed() {
    const allPages = await getPages();
    if (!allPages) {
        return <div>No pages found</div>;
    }
    // const posts = allPages.map((page) => ({
    //     id: page.id,
    //     image: page.pageImageUrl,
    //     createdAt: page.createdAt,
    //     pageId: page.pageId,
    //     likes: 0,
    //     comments: 0,
    // }));
    // const totalLikes = posts.reduce((acc, post) => acc + post.likes, 0);

    return (
        <div className="grid grid-cols-3 gap-1 md:gap-4">
            {allPages && allPages.map((page) => (
                <Card key={page.id} className="p-0 aspect-auto overflow-hidden group cursor-pointer border-0 shadow-sm">
                    <div className="relative w-full h-full">
                        <Link href={`/page/${page.id}`}>
                            <img
                                src={page.pageImageUrl || "https://dummyimage.com/210x297"}
                                alt={`page ${page.id}`}
                                className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                            />
                        </Link>

                        {/* Dark overlay on hover */}
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>

                        <div className="absolute top-3 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                            <span className="text-sm text-accent dark:text-white">{page.createdAt.toLocaleDateString()}</span>
                        </div>
                        <div className="absolute flex w-full justify-between bottom-5 px-4">
                            <div>
                                <h3 className="text-lg font-semibold mix-blend-difference text-white">username</h3>
                            </div>
                            <Bookmark className="w-6 h-6 text-white drop-shadow-md fill-white" />
                        </div>
                    </div>
                </Card>

                // <Card key={page.id} className="p-0 aspect-auto overflow-hidden group cursor-pointer border-0 shadow-sm">
                //     <div className="relative w-full h-full">
                //         <img
                //             src={page.pageCoverImage || "https://dummyimage.com/210x297"}
                //             alt={`page ${page.id}`}
                //             className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                //         />
                //         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                //             <div className="flex items-center gap-4 text-white">
                //                 <div className="flex items-center gap-1">
                //                     <span className="text-sm font-semibold">{page.types}</span>
                //                 </div>
                //                 <div className="flex items-center gap-1">
                //                     <span className="text-sm font-semibold">{page.title}</span>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </Card>
            ))}
        </div>
    )
}

export default Feed