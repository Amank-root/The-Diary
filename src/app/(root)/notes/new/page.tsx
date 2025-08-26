// 'use client'
import NoteEditor from '@/components/singleton/NoteEditor'
import React from 'react'

function CreateNotesPage() {
  return (
    <div className='flex-1 p-4 lg:p-6 space-y-6'>
      <NoteEditor />
    </div>
  )
}

export default CreateNotesPage