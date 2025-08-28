// import { useState, useEffect } from "react"
import { Search, Heart, MessageCircle, Bookmark, MoreHorizontal, Send, Smile } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { toast } from "sonner"
import { Card } from '@/components/ui/card';
import { getPages } from '@/lib/actions/pageAction';
import Link from 'next/link';
import Image from 'next/image';



async function ExplorePage() {
    const allPages = await getPages();
    const trendingHashtags = ["#explore", "#photography", "#travel", "#food", "#art", "#nature", "#fashion", "#fitness"]

    // console.log("All pages:", allPages[0]);
    if (!allPages) {
        return <div>No pages found</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header with Search */}
            <div className="sticky top-0 z-10 bg-background border-b border-border">
                <div className="max-w-4xl mx-auto px-4 py-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search"
                            // value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-input border-border rounded-lg"
                        />
                    </div>
                </div>
            </div>


            {/* Masonry Grid */}
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
                                    <Image
                                        src={page.diary.user.image || "https://dummyimage.com/210x297"}
                                        alt={`Profile picture of ${page.diary.user.username}`}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <h3 className="text-md font-light mix-blend-difference text-white">{page.diary.user.username}</h3>
                                    {/* </div> */}
                                </Link>
                                <Bookmark className="w-6 h-6 text-white drop-shadow-md fill-white" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Post Modal */}
            {/* <div className="p-4"> */}

            {/* <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
                <DialogContent className="max-w-5xl w-11/12 sm:w-full h-[90vh] p-0 bg-background border-2 border-accent-foreground overflow-hidden">
                    {selectedPost && (
                        <div className="flex" style={{maxHeight: "inherit", height: "inherit"}}>
                            <div className="flex-1 w-full max-h-full flex items-center justify-center">
                                <img
                                    src={selectedPost.src || "/placeholder.svg"}
                                    alt="Post content"
                                    className="max-w-full w-full h-full max-h-full object-cover"
                                />
                            </div>
                            <div className="p-4 absolute bottom-0 left-0 right-0 flex justify-between items-center">
                                <div className="p-4 bg-accent rounded-full">
                                <Bookmark className={`${bookmarkedPosts.find(p => p.id === selectedPost.id)?.bookmarked ? "fill-current" : ""}`} onClick={() => handleBookmark(selectedPost.id)} />
                                </div>
                                <div className="flex items-center gap-4 mt-2 flex-col">
                                    <div className="flex items-center gap-2">
                                        <img src={selectedPost.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                                        <span className="font-semibold">{selectedPost.username}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">{selectedPost.location}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog> */}
            {/* </div> */}
        </div>
    )

    // return (
    //     <div className="grid grid-cols-3 gap-1 md:gap-4">
    //         {allPages && allPages.map((page) => (
    //             <Card key={page.id} className="p-0 aspect-auto overflow-hidden group cursor-pointer border-0 shadow-sm">
    //                 <div className="relative w-full h-full">
    //                     <Link href={`/page/${page.id}`}>
    //                         <Image
    //                             width={400}
    //                             height={600}
    //                             src={page.pageImageUrl || "https://dummyimage.com/210x297"}
    //                             alt={`page ${page.id}`}
    //                             className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
    //                         />

    //                         {/* Dark overlay on hover */}
    //                         <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
    //                     </Link>
    //                     <Link href={`/diary/${page.diaryId}`}>
    //                     <div className="absolute top-3 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
    //                         <span className="text-sm text-accent dark:text-white">{page.diary.title}</span>
    //                     </div>
    //                     </Link>
    //                     <div className="absolute flex w-full items-center justify-between bottom-5 px-4">
    //                         {/* <Link href={`/profile/${page.diary.user.username}`} className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"> */}
    //                         <Link href={`/profile/${page.diary.user.username}`} className="flex items-center gap-2">
    //                             {/* <div> */}
    //                                 <Image
    //                                     src={page.diary.user.image || "https://dummyimage.com/210x297"}
    //                                     alt={`Profile picture of ${page.diary.user.username}`}
    //                                     width={40}
    //                                     height={40}
    //                                     className="rounded-full"
    //                                 />
    //                                 <h3 className="text-md font-light mix-blend-difference text-white">{page.diary.user.username}</h3>
    //                             {/* </div> */}
    //                         </Link>
    //                         <Bookmark className="w-6 h-6 text-white drop-shadow-md fill-white" />
    //                     </div>
    //                 </div>
    //             </Card>
    //         ))}
    //     </div>
    // )
}

export default ExplorePage




// "use client"


// const trendingHashtags = ["#explore", "#photography", "#travel", "#food", "#art", "#nature", "#fashion", "#fitness"]

// const exploreContent = [
//     {
//         id: 1,
//         type: "image",
//         src: "https://dummyimage.com/210x297",
//         likes: 1234,
//         comments: 89,
//         aspectRatio: "square",
//         username: "nature_lover",
//         avatar: "/diverse-group-profile.png",
//         caption: "Breathtaking sunset over the mountains 🌄 #nature #photography #sunset",
//         location: "Yosemite National Park",
//         timestamp: "2 hours ago",
//     },
//     {
//         id: 2,
//         type: "image",
//         src: "/delicious-food-photography.png",
//         likes: 2567,
//         comments: 156,
//         aspectRatio: "tall",
//         username: "foodie_adventures",
//         avatar: "/food-blogger-avatar.png",
//         caption: "The perfect ramen bowl on a cold day 🍜 Recipe in bio!",
//         location: "Tokyo, Japan",
//         timestamp: "4 hours ago",
//     },
//     {
//         id: 3,
//         type: "image",
//         src: "/street-art-graffiti.png",
//         likes: 892,
//         comments: 45,
//         aspectRatio: "square",
//         username: "street_artist",
//         avatar: "/street-artist-avatar.png",
//         caption: "New mural downtown! Art speaks where words fail 🎨",
//         location: "Brooklyn, NY",
//         timestamp: "6 hours ago",
//     },
//     {
//         id: 4,
//         type: "image",
//         src: "/minimalist-architecture.png",
//         likes: 3421,
//         comments: 234,
//         aspectRatio: "wide",
//         username: "minimal_spaces",
//         avatar: "/diverse-group-profile.png",
//         caption: "Clean lines and natural light ✨ #architecture #minimal",
//         location: "Copenhagen, Denmark",
//         timestamp: "8 hours ago",
//     },
//     {
//         id: 5,
//         type: "image",
//         src: "/fashion-portrait-photography.png",
//         likes: 1876,
//         comments: 98,
//         aspectRatio: "tall",
//         username: "fashion_forward",
//         avatar: "/diverse-group-profile.png",
//         caption: "Autumn vibes in the city 🍂 #fashion #portrait",
//         location: "Paris, France",
//         timestamp: "10 hours ago",
//     },
//     {
//         id: 6,
//         type: "image",
//         src: "/nature-wildlife-photography.png",
//         likes: 4532,
//         comments: 312,
//         aspectRatio: "square",
//         username: "wildlife_shots",
//         avatar: "/nature-photographer-avatar.png",
//         caption: "Majestic eagle soaring high 🦅 #wildlife #nature",
//         location: "Alaska, USA",
//         timestamp: "12 hours ago",
//     },
//     {
//         id: 7,
//         type: "image",
//         src: "/urban-city-skyline.png",
//         likes: 2198,
//         comments: 167,
//         aspectRatio: "square",
//         username: "city_explorer",
//         avatar: "/diverse-group-profile.png",
//         caption: "City lights never get old ✨ #citylife #skyline",
//         location: "New York, NY",
//         timestamp: "14 hours ago",
//     },
//     {
//         id: 8,
//         type: "image",
//         src: "/abstract-digital-art.png",
//         likes: 1654,
//         comments: 78,
//         aspectRatio: "wide",
//         username: "digital_artist",
//         avatar: "/diverse-group-profile.png",
//         caption: "Digital dreams in motion 🌈 #digitalart #abstract",
//         location: "Los Angeles, CA",
//         timestamp: "16 hours ago",
//     },
//     {
//         id: 9,
//         type: "image",
//         src: "/vintage-car-photography.png",
//         likes: 3287,
//         comments: 189,
//         aspectRatio: "tall",
//         username: "vintage_rides",
//         avatar: "/diverse-group-profile.png",
//         caption: "Classic beauty on wheels 🚗 #vintage #cars",
//         location: "Detroit, MI",
//         timestamp: "18 hours ago",
//     },
//     {
//         id: 10,
//         type: "image",
//         src: "/tropical-beach-sunset.png",
//         likes: 5643,
//         comments: 423,
//         aspectRatio: "square",
//         username: "beach_wanderer",
//         avatar: "/travel-blogger-avatar.png",
//         caption: "Paradise found 🏝️ #beach #sunset #tropical",
//         location: "Maldives",
//         timestamp: "20 hours ago",
//     },
//     {
//         id: 11,
//         type: "image",
//         src: "/cozy-coffee-shop-interior.png",
//         likes: 987,
//         comments: 56,
//         aspectRatio: "wide",
//         username: "coffee_culture",
//         avatar: "/diverse-group-profile.png",
//         caption: "Perfect spot for morning coffee ☕ #coffee #cozy",
//         location: "Seattle, WA",
//         timestamp: "22 hours ago",
//     },
//     {
//         id: 12,
//         type: "image",
//         src: "/mountain-hiking-adventure.png",
//         likes: 2876,
//         comments: 145,
//         aspectRatio: "tall",
//         username: "mountain_hiker",
//         avatar: "/diverse-group-profile.png",
//         caption: "The summit was worth every step 🏔️ #hiking #adventure",
//         location: "Swiss Alps",
//         timestamp: "1 day ago",
//     },
// ]

// export default function InstagramExplore() {
//     const [searchQuery, setSearchQuery] = useState("")
//     const [selectedHashtag, setSelectedHashtag] = useState("")
//     const [selectedPost, setSelectedPost] = useState<(typeof exploreContent)[0] | null>(null)
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [bookmarkedPosts, setBookmarkedPosts] = useState<{id: number, bookmarked: boolean}[]>([])

//     const handleBookmark = (postId: number) => {
//         // Implement bookmark functionality here
//         // console.log(`Bookmark post with id: ${postId}`)
//         // setBookmarkedPosts(prev => [...prev, {id: postId, bookmarked: true}])
//         setBookmarkedPosts(prev => {
//             const exists = prev.find(p => p.id === postId)
//             if (exists) {
//                 return prev.map(p => p.id === postId ? {...p, bookmarked: !p.bookmarked} : p)
//             } else {
//                 return [...prev, {id: postId, bookmarked: true}]
//             }
//         })
//         console.log(bookmarkedPosts)
//         toast.success("Post bookmarked!")
//     }

//     useEffect(() => {
//         const handlePopState = () => {
//             const urlParams = new URLSearchParams(window.location.search)
//             const postId = urlParams.get("p")

//             if (postId) {
//                 const post = exploreContent.find((p) => p.id === Number.parseInt(postId))
//                 if (post) {
//                     setSelectedPost(post)
//                     setIsModalOpen(true)
//                 }
//             } else {
//                 setIsModalOpen(false)
//                 setSelectedPost(null)
//             }
//         }

//         handlePopState()

//         window.addEventListener("popstate", handlePopState)
//         return () => window.removeEventListener("popstate", handlePopState)
//     }, [])

//     const handlePostClick = (post: (typeof exploreContent)[0]) => {
//         setSelectedPost(post)
//         setIsModalOpen(true)

//         const newUrl = `${window.location.pathname}?p=${post.id}`
//         window.history.pushState({ postId: post.id }, "", newUrl)
//     }

//     const handleCloseModal = () => {
//         setIsModalOpen(false)
//         setSelectedPost(null)

//         const newUrl = window.location.pathname
//         window.history.pushState({}, "", newUrl)
//     }

//     const getGridItemClass = (aspectRatio: string) => {
//         switch (aspectRatio) {
//             case "tall":
//                 return "row-span-2"
//             case "wide":
//                 return "col-span-2"
//             default:
//                 return ""
//         }
//     }

// return (
//     <div className="min-h-screen bg-background">
//         {/* Header with Search */}
//         <div className="sticky top-0 z-10 bg-background border-b border-border">
//             <div className="max-w-4xl mx-auto px-4 py-3">
//                 <div className="relative">
//                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//                     <Input
//                         type="text"
//                         placeholder="Search"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="pl-10 bg-input border-border rounded-lg"
//                     />
//                 </div>
//             </div>
//         </div>

//         {/* Trending Hashtags */}
//         <div className="max-w-4xl mx-auto px-4 py-4">
//             <div className="flex gap-2 overflow-x-auto scrollbar-hide">
//                 {trendingHashtags.map((hashtag) => (
//                     <button
//                         key={hashtag}
//                         onClick={() => setSelectedHashtag(hashtag === selectedHashtag ? "" : hashtag)}
//                         className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedHashtag === hashtag
//                             ? "bg-accent text-accent-foreground"
//                             : "bg-muted text-muted-foreground hover:bg-accent/10"
//                             }`}
//                     >
//                         {hashtag}
//                     </button>
//                 ))}
//             </div>
//         </div>

//         {/* Masonry Grid */}
//         <div className="max-w-4xl mx-auto px-4 pb-8">
//             <div className="grid grid-cols-3 gap-1 auto-rows-[200px]">
//                 {exploreContent.map((item) => (
//                     <div
//                         key={item.id}
//                         onClick={() => handlePostClick(item)}
//                         className={`relative group cursor-pointer overflow-hidden bg-card rounded-sm shadow-sm hover:shadow-md transition-shadow ${getGridItemClass(item.aspectRatio)}`}
//                     >
//                         <img src={item.src || "/placeholder.svg"} alt="Explore content" className="w-full h-full object-cover" />

//                         {/* Hover Overlay */}
//                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                             <div className="flex items-center gap-4 text-white">
//                                 <div className="flex items-center gap-1">
//                                     <Heart className="w-5 h-5 fill-white" />
//                                     <span className="font-semibold">{item.likes.toLocaleString()}</span>
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                     <MessageCircle className="w-5 h-5 fill-white" />
//                                     <span className="font-semibold">{item.comments}</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>

//         {/* Suggested Content Section */}
//         <div className="max-w-4xl mx-auto px-4 pb-8">
//             <h2 className="text-lg font-semibold text-foreground mb-4">Suggested for you</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {exploreContent.slice(0, 4).map((item) => (
//                     <div key={`suggested-${item.id}`} className="bg-card rounded-lg shadow-sm overflow-hidden">
//                         <img src={item.src || "/placeholder.svg"} alt="Suggested content" className="w-full h-32 object-cover" />
//                         <div className="p-3">
//                             <div className="flex items-center justify-between">
//                                 <div className="flex items-center gap-2 text-sm text-card-foreground">
//                                     <Heart className="w-4 h-4" />
//                                     <span>{item.likes.toLocaleString()}</span>
//                                 </div>
//                                 <button className="text-accent hover:text-accent/80 transition-colors">
//                                     <Bookmark className="w-4 h-4" />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>

//         {/* Post Modal */}
//         {/* <div className="p-4"> */}

//         <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
//             <DialogContent className="max-w-5xl w-11/12 sm:w-full h-[90vh] p-0 bg-background border-2 border-accent-foreground overflow-hidden">
//                 {selectedPost && (
//                     <div className="flex" style={{maxHeight: "inherit", height: "inherit"}}>
//                         {/* Image Section */}
//                         <div className="flex-1 w-full max-h-full flex items-center justify-center">
//                             <img
//                                 src={selectedPost.src || "/placeholder.svg"}
//                                 alt="Post content"
//                                 className="max-w-full w-full h-full max-h-full object-cover"
//                             />
//                         </div>
//                         <div className="p-4 absolute bottom-0 left-0 right-0 flex justify-between items-center">
//                             {/* on click bookmark make the bookmark active */}
//                             <div className="p-4 bg-accent rounded-full">
//                             <Bookmark className={`${bookmarkedPosts.find(p => p.id === selectedPost.id)?.bookmarked ? "fill-current" : ""}`} onClick={() => handleBookmark(selectedPost.id)} />
//                             </div>
//                             <div className="flex items-center gap-4 mt-2 flex-col">
//                                 <div className="flex items-center gap-2">
//                                     <img src={selectedPost.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
//                                     <span className="font-semibold">{selectedPost.username}</span>
//                                 </div>
//                                 <span className="text-sm text-muted-foreground">{selectedPost.location}</span>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </DialogContent>
//         </Dialog>
//         {/* </div> */}
//     </div>
// )
// }




// // "use client"

// // import { useState } from "react"
// // import { Search, Heart, MessageCircle, Bookmark } from "lucide-react"
// // import { Input } from "@/components/ui/input"

// // const trendingHashtags = ["#explore", "#photography", "#travel", "#food", "#art", "#nature", "#fashion", "#fitness"]

// // const exploreContent = [
// //   {
// //     id: 1,
// //     type: "image",
// //     src: "/beautiful-landscape-photography.png",
// //     likes: 1234,
// //     comments: 89,
// //     aspectRatio: "square",
// //   },
// //   {
// //     id: 2,
// //     type: "image",
// //     src: "/delicious-food-photography.png",
// //     likes: 2567,
// //     comments: 156,
// //     aspectRatio: "tall",
// //   },
// //   {
// //     id: 3,
// //     type: "image",
// //     src: "/street-art-graffiti.png",
// //     likes: 892,
// //     comments: 45,
// //     aspectRatio: "square",
// //   },
// //   {
// //     id: 4,
// //     type: "image",
// //     src: "/minimalist-architecture.png",
// //     likes: 3421,
// //     comments: 234,
// //     aspectRatio: "wide",
// //   },
// //   {
// //     id: 5,
// //     type: "image",
// //     src: "/fashion-portrait-photography.png",
// //     likes: 1876,
// //     comments: 98,
// //     aspectRatio: "tall",
// //   },
// //   {
// //     id: 6,
// //     type: "image",
// //     src: "/nature-wildlife-photography.png",
// //     likes: 4532,
// //     comments: 312,
// //     aspectRatio: "square",
// //   },
// //   {
// //     id: 7,
// //     type: "image",
// //     src: "/urban-city-skyline.png",
// //     likes: 2198,
// //     comments: 167,
// //     aspectRatio: "square",
// //   },
// //   {
// //     id: 8,
// //     type: "image",
// //     src: "/abstract-digital-art.png",
// //     likes: 1654,
// //     comments: 78,
// //     aspectRatio: "wide",
// //   },
// //   {
// //     id: 9,
// //     type: "image",
// //     src: "/vintage-car-photography.png",
// //     likes: 3287,
// //     comments: 189,
// //     aspectRatio: "tall",
// //   },
// //   {
// //     id: 10,
// //     type: "image",
// //     src: "/tropical-beach-sunset.png",
// //     likes: 5643,
// //     comments: 423,
// //     aspectRatio: "square",
// //   },
// //   {
// //     id: 11,
// //     type: "image",
// //     src: "/cozy-coffee-shop-interior.png",
// //     likes: 987,
// //     comments: 56,
// //     aspectRatio: "wide",
// //   },
// //   {
// //     id: 12,
// //     type: "image",
// //     src: "/mountain-hiking-adventure.png",
// //     likes: 2876,
// //     comments: 145,
// //     aspectRatio: "tall",
// //   },
// // ]

// // export default function InstagramExplore() {
// //   const [searchQuery, setSearchQuery] = useState("")
// //   const [selectedHashtag, setSelectedHashtag] = useState("")

// //   const getGridItemClass = (aspectRatio: string) => {
// //     switch (aspectRatio) {
// //       case "tall":
// //         return "row-span-2"
// //       case "wide":
// //         return "col-span-2"
// //       default:
// //         return ""
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* Header with Search */}
// //       <div className="sticky top-0 z-10 bg-background border-b border-border">
// //         <div className="max-w-4xl mx-auto px-4 py-3">
// //           <div className="relative">
// //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
// //             <Input
// //               type="text"
// //               placeholder="Search"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="pl-10 bg-input border-border rounded-lg"
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* Trending Hashtags */}
// //       <div className="max-w-4xl mx-auto px-4 py-4">
// //         <div className="flex gap-2 overflow-x-auto scrollbar-hide">
// //           {trendingHashtags.map((hashtag) => (
// //             <button
// //               key={hashtag}
// //               onClick={() => setSelectedHashtag(hashtag === selectedHashtag ? "" : hashtag)}
// //               className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
// //                 selectedHashtag === hashtag
// //                   ? "bg-accent text-accent-foreground"
// //                   : "bg-muted text-muted-foreground hover:bg-accent/10"
// //               }`}
// //             >
// //               {hashtag}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Masonry Grid */}
// //       <div className="max-w-4xl mx-auto px-4 pb-8">
// //         <div className="grid grid-cols-3 gap-1 auto-rows-[200px]">
// //           {exploreContent.map((item) => (
// //             <div
// //               key={item.id}
// //               className={`relative group cursor-pointer overflow-hidden bg-card rounded-sm shadow-sm hover:shadow-md transition-shadow ${getGridItemClass(item.aspectRatio)}`}
// //             >
// //               <img src={item.src || "/placeholder.svg"} alt="Explore content" className="w-full h-full object-cover" />

// //               {/* Hover Overlay */}
// //               <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
// //                 <div className="flex items-center gap-4 text-white">
// //                   <div className="flex items-center gap-1">
// //                     <Heart className="w-5 h-5 fill-white" />
// //                     <span className="font-semibold">{item.likes.toLocaleString()}</span>
// //                   </div>
// //                   <div className="flex items-center gap-1">
// //                     <MessageCircle className="w-5 h-5 fill-white" />
// //                     <span className="font-semibold">{item.comments}</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Suggested Content Section */}
// //       <div className="max-w-4xl mx-auto px-4 pb-8">
// //         <h2 className="text-lg font-semibold text-foreground mb-4">Suggested for you</h2>
// //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //           {exploreContent.slice(0, 4).map((item) => (
// //             <div key={`suggested-${item.id}`} className="bg-card rounded-lg shadow-sm overflow-hidden">
// //               <img src={item.src || "/placeholder.svg"} alt="Suggested content" className="w-full h-32 object-cover" />
// //               <div className="p-3">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-2 text-sm text-card-foreground">
// //                     <Heart className="w-4 h-4" />
// //                     <span>{item.likes.toLocaleString()}</span>
// //                   </div>
// //                   <button className="text-accent hover:text-accent/80 transition-colors">
// //                     <Bookmark className="w-4 h-4" />
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
