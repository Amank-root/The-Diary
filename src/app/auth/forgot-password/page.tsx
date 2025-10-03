'use client';

import { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.requestPasswordReset({
        email,
        redirectTo: '/auth/reset-password',
      });

      if (error) {
        throw new Error(error.message || 'Failed to send reset email.');
      }

      toast.success(
        'If this email exists in our system, check your email for the reset link'
      );
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred.';
      toast.error(errorMessage);
      console.error('Error requesting password reset:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and we’ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Reset Link
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/auth/sign-up" className="text-primary hover:underline">
              Create one
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 'use client'

// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { useState } from "react"
// import Link from "next/link"
// import { authClient } from "@/lib/auth-client"
// import { toast } from "sonner"

// export default function ForgotPasswordPage() {
//     const [email, setEmail] = useState("")

//     const handleSubmit = async(e: React.FormEvent) => {
//         e.preventDefault()
//         try {
//             const { error } = await authClient.requestPasswordReset({
//                 email,
//                 redirectTo: "/auth/reset-password",
//             });
//             if (error) {
//                 throw error;
//             }
//             toast.success("Password reset email sent successfully.");
//         } catch (error) {
//             console.error("Error requesting password reset:", error);
//             toast.error("Failed to send password reset email.");
//         }
//     }

// return (
//     <div className="flex items-center justify-center min-h-screen px-4">
//         <div className="w-full max-w-md p-8 rounded-lg shadow ouytline outline-1 ">
//             <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <Input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <Button type="submit" className="w-full cursor-pointer">
//                     Send Reset Link
//                 </Button>
//             </form>

//             <p className="mt-6 text-center text-sm text-gray-600">
//                 Don&aposs;t have an account?{' '}
//                 <Link href="/auth/sign-up" className="text-blue-600 hover:underline">
//                     Create one.
//                 </Link>
//             </p>
//         </div>
//     </div>
// )
// }
