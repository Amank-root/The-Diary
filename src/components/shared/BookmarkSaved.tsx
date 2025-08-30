"use client"
import React from 'react'
import { toast } from 'sonner'
import { Bookmark } from 'lucide-react'

function BookmarkSaved() {
    return (
        <Bookmark onClick={() => toast.info("Saved is not yet implemented")} className="w-6 h-6 text-white drop-shadow-md fill-white" />
    )
}

export default BookmarkSaved