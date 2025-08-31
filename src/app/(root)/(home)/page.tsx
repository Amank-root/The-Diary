import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authSessionServer } from "@/lib/auth";
import { redirect } from "next/navigation";
import BookmarkSaved from "@/components/shared/BookmarkSaved";
import { getReadingUsersPosts } from "@/lib/actions/userAction";
import { Plus } from 'lucide-react';



async function Home() {
    const session = await authSessionServer();
    if (!session) {
        redirect("/auth/sign-in");
    }
    const result = await getReadingUsersPosts()
    // // console.log(allPages, 'get reading users posts');

    if (!result || Array.isArray(result)) {
        return <div>No pages found</div>;
    }

    const { getNotes, getPages } = result;

    if (getPages && getPages?.length === 0) {
        return <div>No pages found</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="p-4 border-b">
                <div className="flex items-center gap-4 overflow-x-auto">
                    {/* Add Story */}
                    <Link href={'/notes'}>
                    <div className="flex flex-col items-center gap-1 min-w-0">
                        <div className="relative">
                            <Avatar className="w-16 h-16 border-2 border-dashed border-gray-300">
                                <AvatarFallback>
                                    <Plus className="w-6 h-6 text-gray-400" />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <span className="text-xs text-center">Your Notes</span>
                    </div>
                    </Link>

                    {/* Recent Moods as Stories */}
                    {/* // @ts-expect-error:i d k  */}
                    {getNotes ? getNotes?.map((note) => (
                        <div key={note.id} className="flex flex-col items-center gap-1 min-w-0">
                            <Link href={`/notes`} className='flex flex-col items-center gap-1 min-w-0'>

                                <div className="relative">
                                    <Avatar className="w-16 h-16 border-2 border-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                                        <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                            <AvatarImage src={note.user.image || ""} alt={`User ${note.id}` || "Unknown User"} width={64} height={64} className="w-full h-full object-cover rounded-full" />
                                            <AvatarFallback>{note?.title?.substring(0,2)}</AvatarFallback>
                                            {/* <span className="text-2xl">{note.user.image}</span> */}
                                            {/* <Image
                                                src={note.user.image || "https://dummyimage.com/210x297"}
                                                alt={`User ${note.id}` || "Unknown User"}
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover rounded-full"
                                            /> */}
                                        </div>
                                    </Avatar>
                                </div>
                                <span className="text-xs text-center">{note.title}</span>
                            </Link>
                        </div>
                    )) : (
                        <div className="flex flex-col items-center gap-1 min-w-0">
                            <div className="relative">
                                <Avatar className="w-16 h-16 border-2 border-dashed border-gray-300">
                                    <AvatarFallback>
                                        <Plus className="w-6 h-6 text-gray-400" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <span className="text-xs text-center">No Notes</span>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-4 px-4 py-4">
                {/* // @ts-expect-error: i don't know */}
                {getPages && getPages.map((page) => (
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
                                <BookmarkSaved />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )

}

export default Home