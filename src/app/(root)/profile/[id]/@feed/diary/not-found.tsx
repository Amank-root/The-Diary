import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center px-6">
      {/* dont use card */}
      <div className="max-w-md w-full text-center">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-2">No Diary Found</h2>
          <p className="text-muted-foreground mb-6">
            It looks like you haven’t created a diary yet. Start writing your
            first one now!
          </p>
          <Link href="/diary">
            <Button size="lg" className="w-full">
              Create Diary
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
