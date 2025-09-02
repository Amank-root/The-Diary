import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface LoadingSkeletonProps {
  rows?: number;
  showHeader?: boolean;
  className?: string;
}

const LoadingSkeleton = React.memo(function LoadingSkeleton({ 
  rows = 3, 
  showHeader = true, 
  className = "" 
}: LoadingSkeletonProps) {
  return (
    <Card className={`animate-pulse ${className}`}>
      {showHeader && (
        <CardHeader className="pb-3">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </CardHeader>
      )}
      <CardContent className="space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            {index < rows - 1 && <div className="h-px bg-gray-200 dark:bg-gray-700 my-3"></div>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
});

const AnalyticsLoadingSkeleton = React.memo(function AnalyticsLoadingSkeleton() {
  return (
    <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
      </div>
      
      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Recent entries skeleton */}
      <LoadingSkeleton rows={3} showHeader={true} />
    </div>
  );
});

export { LoadingSkeleton, AnalyticsLoadingSkeleton };
export default LoadingSkeleton;