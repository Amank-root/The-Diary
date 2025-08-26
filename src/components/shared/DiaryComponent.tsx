"use client"

import React from 'react'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Bookmark } from 'lucide-react'
import { Input } from '@/components/ui/input'
import DiaryHeader from '../singleton/DiaryHeader'
import { Separator } from '../ui/separator'
import Image from 'next/image'

function DiaryComponent() {
  const diaryPosts = [
    {
      id: 1,
      title: "A Beautiful Day",
      content: "Today was absolutely wonderful. The weather was perfect and I spent time with family in the park. We had a picnic and watched the sunset together. 🌅✨",
      image: "https://dummyimage.com/600x300",
      date: "August 18, 2025",
      time: "2 hours ago",
      mood: "Happy",
      location: "Central Park",
      tags: ["sunny", "family", "gratitude"],
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      title: "Reflection on Growth",
      content: "I've been thinking a lot about personal growth lately. It's interesting how challenges shape us into who we're meant to become. 💪📚",
      image: "https://dummyimage.com/600x300",
      date: "August 17, 2025",
      time: "1 day ago",
      mood: "Thoughtful",
      location: "Home Office",
      tags: ["reflection", "growth", "mindfulness"],
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      title: "Weekend Adventures",
      content: "This weekend was packed with activities! From hiking in the morning to trying out that new coffee shop everyone's been talking about. ☕🥾",
      image: "https://dummyimage.com/600x300",
      date: "August 16, 2025",
      time: "2 days ago",
      mood: "Excited",
      location: "Mountain Trail",
      tags: ["adventure", "hiking", "weekend"],
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
    }
  ]

  type Mood = "Happy" | "Thoughtful" | "Excited"

  const moodColors: Record<Mood, string> = {
    Happy: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Thoughtful: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Excited: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  }

  return (
    <div className="flex-1 p-4 lg:p-6 space-y-6">
      <DiaryHeader
        isDiary={true}
        title="Your Diaries"
        description="Keep track of your thoughts and experiences."
        btnText="New Diary"
        // href="/diary/new"
      />

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your diary entries..."
          className="pl-10"
        />
      </div>

      <Separator />

      {/* Rectangular Diary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {diaryPosts.map((post) => (
          <Card
            key={post.id}
            className="overflow-hidden p-0 relative group transition-all duration-200 hover:shadow-lg hover:scale-[1.01]"
          >
            {/* Main image */}
            <div className="relative h-90 w-full">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={300}
                className="w-full h-full object-cover transition duration-300 group-hover:brightness-95"
              />

              {/* Avatar on hover (top-left) */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Image
                  src={post.avatar}
                  alt="Author avatar"
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white shadow-md"
                />
              </div>

              {/* Bookmark icon (always visible, bottom-right) */}
              <div className="absolute bottom-3 right-3">
                <Bookmark className="w-6 h-6 text-white drop-shadow-md fill-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>


    </div>
  )
}

export default DiaryComponent





// "use client"

// import React from 'react'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import { Calendar, Clock, Plus, Search, MapPin, MoreHorizontal, Bookmark } from 'lucide-react'
// import { Input } from '@/components/ui/input'
// import { toast } from 'sonner'
// import DiaryHeader from '../singleton/DiaryHeader'
// import { Separator } from '../ui/separator'
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
// import { Button } from '../ui/button'
// import Image from 'next/image'

// function DiaryComponent() {
//   const recentEntries = [
//     {
//       id: 1,
//       title: "A Beautiful Day",
//       preview: "Today was absolutely wonderful. The weather was perfect and I spent time...",
//       date: "August 18, 2025",
//       mood: "Happy",
//       tags: ["sunny", "family", "gratitude"]
//     },
//     {
//       id: 2,
//       title: "Reflection on Growth",
//       preview: "I've been thinking a lot about personal growth lately. It's interesting how...",
//       date: "August 17, 2025",
//       mood: "Thoughtful",
//       tags: ["reflection", "growth", "mindfulness"]
//     },
//     {
//       id: 3,
//       title: "Weekend Adventures",
//       preview: "This weekend was packed with activities. From hiking in the morning to...",
//       date: "August 16, 2025",
//       mood: "Excited",
//       tags: ["adventure", "hiking", "weekend"]
//     }
//   ]
//   const exploreContent = [
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

//   const diaryPosts = [
//     {
//       id: 1,
//       title: "A Beautiful Day",
//       content: "Today was absolutely wonderful. The weather was perfect and I spent time with family in the park. We had a picnic and watched the sunset together. Moments like these remind me how grateful I am for the simple pleasures in life. 🌅✨",
//       image: "https://dummyimage.com/210x297",
//       //   image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
//       date: "August 18, 2025",
//       time: "2 hours ago",
//       mood: "Happy",
//       location: "Central Park",
//       tags: ["sunny", "family", "gratitude"],
//       likes: 12,
//       comments: 3,
//       avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
//     },
//     {
//       id: 2,
//       title: "Reflection on Growth",
//       content: "I've been thinking a lot about personal growth lately. It's interesting how challenges shape us into who we're meant to become. Today I faced a difficult situation at work, but instead of feeling overwhelmed, I felt empowered. 💪📚",
//       image: "https://dummyimage.com/210x297",
//       //   image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=400&fit=crop",
//       date: "August 17, 2025",
//       time: "1 day ago",
//       mood: "Thoughtful",
//       location: "Home Office",
//       tags: ["reflection", "growth", "mindfulness"],
//       likes: 8,
//       comments: 5,
//       avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
//     },
//     {
//       id: 3,
//       title: "Weekend Adventures",
//       content: "This weekend was packed with activities! From hiking in the morning to trying out that new coffee shop everyone's been talking about. Sometimes the best therapy is just getting out and exploring the world around you. ☕🥾",
//       image: "https://dummyimage.com/210x297",
//       //   image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=400&fit=crop",
//       date: "August 16, 2025",
//       time: "2 days ago",
//       mood: "Excited",
//       location: "Mountain Trail",
//       tags: ["adventure", "hiking", "weekend"],
//       likes: 15,
//       comments: 7,
//       avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
//     }
//   ]


//   type Mood = "Happy" | "Thoughtful" | "Excited";

//   const moodColors: Record<Mood, string> = {
//     "Happy": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
//     "Thoughtful": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
//     "Excited": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
//   }

//   return (
//     <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">
//       {/* Header Section */}
//       <DiaryHeader
//         title="Your Diaries"
//         description="Keep track of your thoughts and experiences."
//         btnText="New Diary"
//         // onButtonClick={() => toast.success("New diary created!")}
//         href='/diary/new'
//       />

//       {/* Search Bar */}
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//         <Input
//           placeholder="Search your diary entries..."
//           className="pl-10"
//         />
//       </div>
//       <Separator />
//       {/* List all the Diaries of the user */}
//       <div className='flex gap-3'>
//         <div className="max-w-4xl mx-auto px-4 pb-8">
//           <div className="grid grid-cols-3 gap-1 auto-rows-[200px]">
//             {exploreContent.map((item) => (
//               <div
//                 key={item.id}
//                 // onClick={() => handlePostClick(item)}
//                 className={`relative group cursor-pointer overflow-hidden bg-card rounded-sm shadow-sm hover:shadow-md transition-shadow`}
//               >
//                 <img src={item.src || "/placeholder.svg"} alt="Explore content" className="w-full h-full object-cover" />

//                 {/* Hover Overlay */}
//                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                   <div className="flex items-center gap-4 text-white">
//                     <div className="flex items-center gap-1">
//                       <Bookmark className="w-5 h-5 fill-white" />
//                       <span className="font-semibold">{item.likes.toLocaleString()}</span>
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <Bookmark className="w-5 h-5 fill-white" />
//                       <span className="font-semibold">{item.comments}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>


//         {/* {diaryPosts.map((post) => (
//           <Card key={post.id} className="gap-3 rounded-lg overflow-hidden border-0 border-b p-0">

//             <div className="relative aspect-square">
//               <img
//                 src={post.image}
//                 alt={post.title}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="p-4 absolute">
//               <div className="flex items-center justify-between mb-3 absolute bottom-0">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="p-0 h-auto"
//                 >
//                   <Bookmark
//                     className={`w-6 h-6 ${[1].includes(post.id)
//                       ? 'fill-foreground'
//                       : ''
//                       }`}
//                   />
//                 </Button>
//               </div>
//               <div className="space-y-1">
//                 <p className="text-xs text-muted-foreground uppercase tracking-wide">
//                   {post.time}
//                 </p>
//               </div>
//             </div>
//           </Card>
//         ))} */}









//         {/* <Card className='p-0 '>
//           <CardHeader>
//             <CardTitle>Your Diary Title</CardTitle>
//             <CardDescription>Your diary description goes here.</CardDescription>
//           </CardHeader>
//           <CardContent className='p-0'>
//             <div className="flex justify-between">
//               <Image width={100} height={200} className='rounded-md w-full object-cover' alt="Diary Entry" src="https://dummyimage.com/210x297" />
//             </div>
//             <div className="mt-2">
//               <Badge variant="outline" className="mr-2">sunny</Badge>
//             </div>
//           </CardContent>
//         </Card> */}



//       </div>
//       {/* <div className="space-y-4">
//         {recentEntries.map((entry) => (
//           <Card key={entry.id}>
//             <CardHeader>
//               <CardTitle>{entry.title}</CardTitle>
//               <CardDescription>{entry.preview}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex justify-between">
//                 <span className={`badge ${moodColors[entry.mood]}`}>{entry.mood}</span>
//                 <span className="text-sm text-muted-foreground">{entry.date}</span>
//               </div>
//               <div className="mt-2">
//                 {entry.tags.map((tag) => (
//                   <Badge key={tag} variant="outline" className="mr-2">
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div> */}

//     </div>
//   )
// }

// export default DiaryComponent
