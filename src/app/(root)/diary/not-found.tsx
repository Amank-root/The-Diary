// "use client"

import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import Link from "next/link"

export default function NotFound({ showCreateDiary = true }: { showCreateDiary?: boolean }) {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center text-center">
      {/* Icon */}
      <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />

      {/* Message */}
      <h2 className="text-lg font-semibold">No diaries yet</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        You haven’t created any diaries yet. Start writing your first diary and share your thoughts with others.
      </p>

      {/* Action */}
      {showCreateDiary && (
        <Link href="/diary/create" className="mt-6">
          <Button size="lg">Create Diary</Button>
        </Link>
      )}
    </div>
  )
}
