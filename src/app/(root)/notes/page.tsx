import React from 'react'
import DiaryHeader from '@/components/singleton/DiaryHeader'

    // title: string;
    // description: string;
    // btnText?: string | undefined;
    // onButtonClick?: (() => void) | undefined;
    // btnHidden?: boolean | undefined;


function Notes() {
  return (
    <div className='flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6'>
      <DiaryHeader title='My Notes' description='A collection of my personal notes.' btnText='Add Note' href='/notes/new' />
      <h1>Notes</h1>
    </div>
  )
}

export default Notes