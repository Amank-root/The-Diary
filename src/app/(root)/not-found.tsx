// app/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold mb-3">Nothing to see here 👀</h1>
      <p className="text-muted-foreground text-lg mb-6 max-w-md">
        Follow users to view their diary entries. Start by exploring new people
        or check your profile to customize your experience.
      </p>

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

      <p className="text-sm text-muted-foreground mt-6">
        Tip: The more users you follow, the richer your diary feed becomes ✨
      </p>
    </div>
  )
}
