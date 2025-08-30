import React from 'react'
import DiaryHeader from '@/components/singleton/DiaryHeader'
import { Separator } from '@/components/ui/separator';
import DiaryFlip from '@/components/singleton/DiaryFlip';
import { getDiaryById } from '@/lib/actions/diaryAction';

async function InnerDiary({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const getDiary = await getDiaryById(id);

  return (
    <div className="flex-1 p-4 lg:p-6 space-y-6">
      <DiaryHeader
        title="Your Diaries"
        description="Keep track of your thoughts and experiences."
        btnText="Add Page"
        href={`/diary/${id}/create`}
      />
      <Separator />
      {getDiary ? (
        // @ts-expect-error: i dont know
        <DiaryFlip diary={getDiary} />
      ) : (
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500">Diary not found</p>
        </div>
      )}
    </div>
  )
}

export default InnerDiary