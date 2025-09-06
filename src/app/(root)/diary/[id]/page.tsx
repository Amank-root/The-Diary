import React from 'react'
import DiaryHeader from '@/components/singleton/DiaryHeader'
import { Separator } from '@/components/ui/separator';
import DiaryFlip from '@/components/singleton/DiaryFlip';
import { getDiaryById } from '@/lib/actions/diaryAction';
import NotFound from '../not-found';

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
        <NotFound/>
      )}
    </div>
  )
}

export default InnerDiary