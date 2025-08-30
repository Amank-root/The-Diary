import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function page() {
    return (
        <div className="flex items-center justify-center px-6">
            {/* dont use card */}
            <div className="max-w-md w-full text-center">
                <div className="p-8">
                    <h2 className="text-2xl font-semibold mb-2">Developer Error</h2>
                    <p className="text-muted-foreground mb-6">
                        Saved is not yet implemented. Please check back later.
                    </p>
                    <Link href="/profile/amank-root">
                        <Button size="lg" className="w-full">
                            Complain
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page;



//     const posts = [
//         { id: 1, image: "https://dummyimage.com/210x297", likes: 10, comments: 5 },
//         { id: 2, image: "https://dummyimage.com/210x297", likes: 20, comments: 10 },
//         { id: 3, image: "https://dummyimage.com/210x297", likes: 30, comments: 15 },
//     ];
//     return (
//         <div className="grid grid-cols-3 gap-1 md:gap-4">
//             {posts.map((post) => (
//                 <Card key={post.id} className="p-0 aspect-auto overflow-hidden group cursor-pointer border-0 shadow-sm">
//                     <div className="relative w-full h-full">
//                         <img
//                             src={post.image || "https://dummyimage.com/210x297"}
//                             alt={`Post ${post.id}`}
//                             className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
//                         />
//                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                             <div className="flex items-center gap-4 text-white">
//                                 <div className="flex items-center gap-1">
//                                     <span className="text-sm font-semibold">{post.likes}</span>
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                     <span className="text-sm font-semibold">{post.comments}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </Card>
//             ))}
//         </div>
//     )
// }
