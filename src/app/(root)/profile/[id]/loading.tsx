import React from 'react'

// app/profile/[id]/loading.tsx

export default function LoadingProfile() {
  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Profile Header Skeleton */}
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-300 rounded w-1/3" />
          <div className="h-6 bg-gray-300 rounded w-1/4" />
        </div>

        {/* Profile Details Skeleton */}
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-5/6" />
          <div className="h-4 bg-gray-300 rounded w-3/4" />
        </div>

      </div>
    </div>
  );
}
