import React from 'react'
import DiaryHeader from '@/components/singleton/DiaryHeader'
import { Separator } from '@/components/ui/separator'
import NotesTab from './NotesTab'
// import { getAllUserNotes } from '@/lib/actions/notesAction'
// title: string;
// description: string;
// btnText?: string | undefined;
// onButtonClick?: (() => void) | undefined;
// btnHidden?: boolean | undefined;


async function Notes() {
  // const response = await getAllUserNotes();
  
  return (
    <div className='flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6'>
      <DiaryHeader title='My Notes' description='A collection of my personal notes.' btnText='Add Note' href='/notes/new' />
      <Separator />
      <div>
        <NotesTab  />
      </div>
    </div>
  )
}

export default Notes