'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

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

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const token = searchParams.get('token') as string;
  const error = searchParams.get('error') as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.resetPassword({
        newPassword: password,
        token,
      });
      await authClient.revokeSessions();

      if (error) {
        throw new Error('Failed to reset password.');
      }

      toast.success('Password reset successfully.');
      router.push('/auth/sign-in');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong.';
      toast.error(`${message} ❌❌`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error ?? 'Invalid or expired reset token.');
      router.replace('/auth/forgot-password');
    }
  }, [error, router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your new password to regain access to your account.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Reset Password
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
// import { useState, useEffect } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import Link from "next/link"
// import { toast } from "sonner"
// import { authClient } from "@/lib/auth-client"

// export default function ResetPasswordPage() {
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const token = searchParams.get("token") as string;
//   const error = searchParams.get("error") as string;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match.")
//       return
//     }
//     const { error } = await authClient.resetPassword({
//       newPassword: password,
//       token,
//     });

//     // console.log(data)

//     if (error) {
//       toast.error("Failed to reset password.")
//       return
//     }

//     toast.success("Password reset successfully.")
//     router.push("/auth/sign-in")
//   }

//   useEffect(() => {
//     if (error) {
//       toast.error(error ?? "Failed to send password reset email.");

//       router.replace("/auth/forgot-password");
//     }
//   }, [error, router]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
//         <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <Input
//             type="password"
//             placeholder="New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <Input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//           <Button type="submit" className="w-full cursor-pointer">
//             Reset Password
//           </Button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//           Don’t have an account?{' '}
//           <Link href="/auth/sign-up" className="text-blue-600 hover:underline">
//             Create one.
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }
