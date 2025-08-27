import React from 'react'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Bookmark } from 'lucide-react'
import { Input } from '@/components/ui/input'
import DiaryHeader from '@/components/singleton/DiaryHeader'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import { getDiaries } from '@/lib/actions/diaryAction'

async function Diary() {
  const getAllDiaries = await getDiaries()
  // console.log("Diaries Data:", /diarydiarys)

  const demoData = [
    {
      id: 'cmeok7d28000007hwbs06ol2o',
      slug: '66877263-982c-47fd-bf88-4842faf1ad50',
      title: 'New Diary',
      diaryCoverImage: 'https://res.cloudinary.com/dp3vyfcyc/image/upload/v1755971357/Modern_Botanical_Journal_Cover_Diary_wedo3z.png',
      createdAt: "2025-08-23T17:54:46.877Z",
      updatedAt: "2025-08-23T17:55:30.372Z",
      userId: 'auzmVGEA38eQfnMGybilUXgU59o5utvC',
      types: 'SPECIAL'
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
      <div className="grid h-full grid-cols-2 lg:grid-cols-3 gap-6 ">
        {getAllDiaries ? getAllDiaries?.map((diary) => (
          <Card key={diary.id} className="p-0 aspect-auto overflow-hidden group cursor-pointer border-0 shadow-sm">
            <div className="relative w-full h-full">
              <Link href={`/diary/${diary.id}`}>
                <img
                  src={diary.diaryCoverImage || "https://dummyimage.com/210x297"}
                  alt={`diary ${diary.id}`}
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
                    <span className="text-sm font-semibold">{diary.mood}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">{diary.date}</span>
                  </div>
                </div>
              </div> */}
            </div>
          </Card>
        )) : (
          <p>No diary entries found.</p>
        )}
      </div>


    </div>
  )
}

export default Diary