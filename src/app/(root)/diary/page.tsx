import React from 'react'
import { Card } from '@/components/ui/card'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import DiaryHeader from '@/components/singleton/DiaryHeader'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { getDiaries } from '@/lib/actions/diaryAction'
import BookmarkSaved from '@/components/shared/BookmarkSaved'
import Image from 'next/image'
import { notFound } from 'next/navigation'

async function Diary() {
  const getAllDiaries = await getDiaries()

  if (getAllDiaries?.length === 0) {
    return notFound()
  }
  // console.log(getAllDiaries, 'get all diaries');

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
        {/* // @ts-expect-error: i dont know */}
        {getAllDiaries ? getAllDiaries?.map((diary) => (
          <Card key={diary.id} className="p-0 aspect-auto overflow-hidden group cursor-pointer border-0 shadow-sm">
            <div className="relative w-full h-full">
              <Link href={`/diary/${diary.id}`}>
                <Image
                  width={400}
                  height={600}
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
              <div className="absolute flex items-center w-full justify-between bottom-5 px-4">
                <div>
                  {/* title */}
                  <h3 className="text-md md:text-lg font-semibold mix-blend-difference text-white">{diary.title}</h3>
                </div>
                <BookmarkSaved />
              </div>
           
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