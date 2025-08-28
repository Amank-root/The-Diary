'use client';

import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Profile page error:", error);
  }, [error]);

  return (
    <div className="w-full h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-4xl font-bold text-red-600">Something went wrong</h1>
        <p className="text-gray-700">
          Sorry, there was a problem loading this profile. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
