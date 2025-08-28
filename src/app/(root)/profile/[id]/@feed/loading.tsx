import { Card } from "@/components/ui/card";

export default function Loading() {
  // Create an array of placeholders, say for 6 items
  const placeholders = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4">
      {placeholders.map((_, idx) => (
        <Card key={idx} className="p-0 aspect-auto overflow-hidden border-0 shadow-sm animate-pulse">
          <div className="relative w-full h-full">
            {/* Image placeholder */}
            <div className="w-full h-60 bg-gray-300 dark:bg-gray-700" />

            {/* Dark overlay (just a placeholder block here) */}
            <div className="absolute inset-0 bg-black opacity-30" />

            {/* Diary title placeholder */}
            <div className="absolute top-3 left-4">
              <div className="h-4 w-24 bg-gray-400 dark:bg-gray-600 rounded" />
            </div>

            {/* Bottom profile and bookmark placeholder */}
            <div className="absolute flex w-full items-center justify-between bottom-5 px-4">
              <div className="flex items-center gap-2">
                {/* Profile image */}
                <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600" />
                {/* Username */}
                <div className="h-4 w-20 bg-gray-400 dark:bg-gray-600 rounded" />
              </div>

              {/* Bookmark icon placeholder */}
              <div className="w-6 h-6 bg-gray-400 dark:bg-gray-600 rounded" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
