// app/reset-password/page.tsx
'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const token = searchParams.get("token") as string;
  const error = searchParams.get("error") as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }
    const { data, error } = await authClient.resetPassword({
      newPassword: password,
      token,
    });

    // console.log(data)

    if (error) {
      toast.error("Failed to reset password.")
      return
    }

    toast.success("Password reset successfully.")
    router.push("/auth/sign-in")
  }

  useEffect(() => {
    if (error) {
      toast.error(error ?? "Failed to send password reset email.");

      router.replace("/auth/forgot-password");
    }
  }, [error, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full cursor-pointer">
            Reset Password
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link href="/auth/sign-up" className="text-blue-600 hover:underline">
            Create one.
          </Link>
        </p>
      </div>
    </div>
  )
}
