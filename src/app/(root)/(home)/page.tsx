import { Bookmark } from "lucide-react"
import { Card } from '@/components/ui/card';
import { getPages } from '@/lib/actions/pageAction';
import Link from 'next/link';
import Image from 'next/image';
import { getSimilarUsers } from "@/lib/actions/exploreActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { followUser, unfollowUser } from "@/lib/actions/profile";
import { authSessionServer } from "@/lib/auth";



async function ExplorePage() {
    const allPages = await getPages();

    if (!allPages) {
        return <div>No pages found</div>;
    }


    return (
        <div className="min-h-screen bg-background py-4">
            <div className="grid grid-cols-3 gap-1 md:gap-4 px-4 pb-4">
                {allPages && allPages.map((page) => (
                    <Card key={page.id} className="p-0 aspect-auto overflow-hidden group cursor-pointer border-0 shadow-sm">
                        <div className="relative w-full h-full">
                            <Link href={`/page/${page.id}`}>
                                <Image
                                    width={400}
                                    height={600}
                                    src={page.pageImageUrl || "https://dummyimage.com/210x297"}
                                    alt={`page ${page.id}`}
                                    className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                                />

                                {/* Dark overlay on hover */}
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                            </Link>
                            <Link href={`/diary/${page.diaryId}`}>
                                <div className="absolute top-3 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                                    <span className="text-sm text-accent dark:text-white">{page.diary.title}</span>
                                </div>
                            </Link>
                            <div className="absolute flex w-full items-center justify-between bottom-5 px-4">
                                {/* <Link href={`/profile/${page.diary.user.username}`} className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"> */}
                                <Link href={`/profile/${page.diary.user.username}`} className="flex items-center gap-2">
                                    {/* <div> */}
                                    <Avatar>
                                        <AvatarImage src={page.diary.user.image || "https://dummyimage.com/210x297"} alt={`Profile picture of ${page.diary.user.username}`} />
                                        <AvatarFallback>{page.diary.user.username}</AvatarFallback>
                                    </Avatar>
                                    <h3 className="text-md font-light mix-blend-difference text-white">{page.diary.user.username}</h3>
                                    {/* </div> */}
                                </Link>
                                <Bookmark className="w-6 h-6 text-white drop-shadow-md fill-white" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )

}

export default ExplorePage




// import MainContent from "@/components/shared/MainContent";


// export default function Home() {

//   return (
//     <div>
//       {/* <MainContent /> */}
//     </div>
//   );
// }
