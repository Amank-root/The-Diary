import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { sendEmail, resetPassword } from "@/email/mail-conf";
import { nextCookies } from "better-auth/next-js";


// Create a global instance to avoid multiple connections in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", 
  }),
  trustedOrigins: ["http://localhost:3000", "https://write-diary.vercel.app"],
  
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    sendResetPassword: async ({user, url}) => {
      await resetPassword(url, user);
    },
    revokeSessionsOnPasswordReset: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({url, user}) => {
      await sendEmail(url, user);
    },
    autoSignInAfterVerification: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  
  user: {
    additionalFields: {
      username: {
        defaultValue() {
          // how to access email here?
          // console.warn(this.input, "fhdjfvjdhg")
          return "user" + Math.floor(Math.random() * 10000); // Default username if not provided
        },
        type: "string",
        required: false,
        unique: true,
        input: true,
      },
    },
  },
  
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5 // 5 minutes
    }
  },
  
  // Advanced settings for production
  advanced: {
    crossSubDomainCookies: {
      enabled: false // Set to true if you have subdomains
    },
    // generateId: false // Use default ID generation
    database: {
      generateId: false // Use default ID generation
    }
  },
  
  plugins: [nextCookies()],
  
  // Ensure proper cookie settings for production
  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      }
    }
  }
});

export const authSessionServer = async () => {
  return await auth.api.getSession({headers: await headers()});
}


export type Session = typeof auth.$Infer.Session;