'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            const { error } = await authClient.requestPasswordReset({
                email,
                redirectTo: "/auth/reset-password",
            });
            if (error) {
                throw error;
            }
            toast.success("Password reset email sent successfully.");
        } catch (error) {
            console.error("Error requesting password reset:", error);
            toast.error("Failed to send password reset email.");
        }
    }

return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full cursor-pointer">
                    Send Reset Link
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Don&aposs;t have an account?{' '}
                <Link href="/auth/sign-up" className="text-blue-600 hover:underline">
                    Create one.
                </Link>
            </p>
        </div>
    </div>
)
}
