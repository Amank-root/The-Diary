import React from 'react';
import { Separator } from '@/components/ui/separator';
import DiaryHeader from '@/components/singleton/DiaryHeader';
import TipTapEditor from '@/components/singleton/BasicTipTapEditor';

async function CreatePage() {
  return (
    <div className="flex-1 p-4 lg:p-6 space-y-6">
      <DiaryHeader
        title="Page"
        description="Write your thoughts and experiences."
      />
      <Separator />
      <TipTapEditor />
    </div>
  );
}

export default CreatePage;
