// components/search-user-not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SearchUserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      {/* Illustration / Emoji */}
      <div className="text-6xl mb-4">🔍</div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-2">No user found</h2>

      {/* Supporting text */}
      <p className="text-muted-foreground mb-6 max-w-md">
        We couldn’t find anyone with that name. Try searching with a different
        username, or explore active users to start connecting.
      </p>

      {/* Suggested actions */}
      <div className="flex gap-4">
        <Link href="/explore">
          <Button size="lg" className="rounded-xl">
            Explore Users
          </Button>
        </Link>
        <Link href="/profile">
          <Button variant="outline" size="lg" className="rounded-xl">
            Back to Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
