'use client';

import React from 'react';

import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Icon Container */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-40"></div>
            <div className="relative bg-white rounded-full p-6 shadow-lg border border-slate-200">
              <Mail className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 sm:p-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            <span className="text-balance">Check your email</span>
          </h1>

          <p className="text-slate-600 text-lg mb-2 leading-relaxed">
            We've sent a verification link
          </p>

          {/* <p className="text-blue-600 font-semibold text-lg mb-8 break-all">
            your-email@example.com
          </p> */}

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 text-left">
            <p className="text-sm text-slate-700 flex items-start gap-3">
              <span className="text-blue-600 font-bold flex-shrink-0 mt-0.5">
                →
              </span>
              <span>
                Click the link in the email to verify your account and get
                started
              </span>
            </p>
          </div>

          <p className="text-sm text-slate-500 mb-8">
            Didn't receive the email? Check your spam folder.
          </p>

          {/* Button */}
          <Button
            variant="ghost"
            className="w-full h-11 text-base font-semibold text-slate-700 hover:bg-slate-100"
            asChild
          >
            <Link href={'/'}>Back to login</Link>
          </Button>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Link expires in{' '}
              <span className="font-semibold text-slate-700">1 hours</span>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Your account is secure. We'll never share your email.</p>
        </div>
      </div>
    </main>
  );
}
