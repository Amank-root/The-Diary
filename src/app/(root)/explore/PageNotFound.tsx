// app/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PageNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      {/* Illustration / Emoji */}
      <div className="text-6xl mb-4">📓</div>

      {/* Main Heading */}
      <h1 className="text-3xl font-bold mb-3">No diaries have been posted yet</h1>

      {/* Supporting text */}
      <p className="text-muted-foreground text-lg mb-6 max-w-lg">
        This platform is still growing 🌱. Be the first to invite friends and 
        encourage them to share their diaries. The more people join, 
        the richer your feed becomes!
      </p>

      {/* Call-to-action buttons */}
      <div className="flex gap-4">
        <Link href="/profile">
          <Button size="lg" className="rounded-xl">
            Go to Profile
          </Button>
        </Link>
        <Link href="/explore">
          <Button variant="outline" size="lg" className="rounded-xl">
            Explore Users
          </Button>
        </Link>
      </div>

      {/* Extra encouragement */}
      <p className="text-sm text-muted-foreground mt-6">
        Tip: Share this platform with your friends to see more diaries ✨
      </p>
    </div>
  )
}
