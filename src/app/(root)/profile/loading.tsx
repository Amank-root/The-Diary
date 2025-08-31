// app/profile/loading.tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col items-center px-6 py-12">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <Skeleton className="h-24 w-24 rounded-full" /> {/* Avatar */}
        <Skeleton className="h-6 w-40" /> {/* Username */}
        <Skeleton className="h-4 w-64" /> {/* Bio */}
      </div>

      {/* Stats Section */}
      <div className="flex gap-6 mb-10">
        <Skeleton className="h-10 w-20 rounded-md" />
        <Skeleton className="h-10 w-20 rounded-md" />
        <Skeleton className="h-10 w-20 rounded-md" />
      </div>

      {/* Diary Feed Placeholder */}
      <div className="w-full max-w-2xl space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-5 w-1/3" /> {/* Title */}
            <Skeleton className="h-4 w-full" /> {/* Content line 1 */}
            <Skeleton className="h-4 w-5/6" /> {/* Content line 2 */}
          </div>
        ))}
      </div>
    </div>
  )
}
