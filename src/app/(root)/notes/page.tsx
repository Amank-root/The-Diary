import React from 'react';
import DiaryHeader from '@/components/singleton/DiaryHeader';
import { Separator } from '@/components/ui/separator';
import NotesTab from './NotesTab';

async function Notes() {
  return (
    <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">
      <DiaryHeader
        title="My Notes"
        description="A collection of personal notes."
      />
      <Separator />
      <div>
        <NotesTab />
      </div>
    </div>
  );
}

export default Notes;
