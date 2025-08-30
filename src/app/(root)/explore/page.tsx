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
import BookmarkSaved from "@/components/shared/BookmarkSaved";



async function ExplorePage({ searchParams }: { searchParams: Promise<{ search: string | null }> }) {
    const { search } = await searchParams || null;
    const allPages = await getPages();
    const getUsers = search && await getSimilarUsers(search);
    const session = await authSessionServer();

    if (search && !getUsers) {
        return <div className="px-4">No User Found</div>
    }

    if (!allPages) {
        return <div>No pages found</div>;
    }
    // const syntheticUsers = [
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    //     {
    //         id: "1",
    //         name: "John Doe",
    //         image: "https://dummyimage.com/210x297",
    //         username: "johndoe"
    //     },
    // ]

    if (search && getUsers) {
        // console.log(getUsers.currentUser, getUsers.users);
        return (
            <div className="space-y-2 p-4">
                {getUsers.users.map((user) => (
                    <div
                        key={Math.random().toString(36).substr(2, 9)}
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted transition"
                    >
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={user.image ?? "https://dummyimage.com/210x297"} alt={user.username ?? undefined} />
                                <AvatarFallback>{user.username?.slice(0, 2).toUpperCase() ?? user.name}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{user.username}</span>
                        </div>
                        {/* {getUsers.currentUser, user} */}
                        {getUsers.currentUser?.reading.some(reading => reading.readingId === user.id) ? (
                            // @ts-ignore
                            <form action={unfollowUser.bind(null, user.username)}>
                                {/* console.log user and currentUser */}
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    type="submit"
                                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                >
                                    Reading
                                </Button>
                            </form>
                        ) : (
                            // @ts-ignore
                            <form action={followUser.bind(null, user.username)}>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    type="submit"
                                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                >
                                    Read
                                </Button>
                            </form>
                        )}
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 px-4 pb-4">
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
                                    <h3 className="text-sm md:text-md font-light mix-blend-difference text-white">{page.diary.user.username}</h3>
                                    {/* </div> */}
                                </Link>
                                <BookmarkSaved/>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )

}

export default ExplorePage


