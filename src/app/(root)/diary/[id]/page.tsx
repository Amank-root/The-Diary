import React from 'react'
import DiaryHeader from '@/components/singleton/DiaryHeader'
import { Separator } from '@/components/ui/separator';
import DiaryFlip from '@/components/singleton/DiaryFlip';

async function InnerDiary({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="flex-1 p-4 lg:p-6 space-y-6">
      <DiaryHeader
        // isDiary={true}
        title="Your Diaries"
        description="Keep track of your thoughts and experiences."
        btnText="Add Page"
        href={`/diary/${id}/create`}
      />
      <Separator />
      <DiaryFlip  />
    </div>
  )
}

export default InnerDiary