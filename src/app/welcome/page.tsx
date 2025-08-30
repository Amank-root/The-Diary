"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Heart, Shield, Users } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function WelcomePage() {
  const { data: session } = useSession();

  if(session) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white/80 backdrop-blur-sm">
        <Link className="flex items-center justify-center" href="/">
          <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
          <span className="font-bold text-xl">My Diary</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/auth/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Your Personal Digital Diary
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Capture your thoughts, memories, and experiences in a beautiful, secure digital space. 
                Share moments with friends or keep them private - it&apos;s your choice.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/auth/sign-up">
                <Button size="lg" className="h-12 px-8">
                  Start Writing Today
                </Button>
              </Link>
              <Link href="/auth/sign-in">
                <Button variant="outline" size="lg" className="h-12 px-8">
                  Already have an account?
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card className="border-0 shadow-md">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 mx-auto text-red-500 mb-4" />
                <CardTitle>Rich Text Editor</CardTitle>
                <CardDescription>
                  Express yourself with our beautiful markdown editor. Add images, format text, and create beautiful entries.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <CardTitle>Privacy First</CardTitle>
                <CardDescription>
                  Your thoughts are yours. Choose what to share publicly and what to keep private with granular privacy controls.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                <CardTitle>Social Features</CardTitle>
                <CardDescription>
                  Connect with friends, share your favorite memories, and discover inspiring stories from others.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Your Journey?
              </h2>
              <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
                Join thousands of users who trust My Diary to capture their most important moments.
              </p>
            </div>
            <Link href="/auth/sign-up">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Create Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white">
        <p className="text-xs text-gray-500">© 2025 My Diary. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
