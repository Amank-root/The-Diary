import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { sendEmail } from "@/email/mail-conf";
import { nextCookies } from "better-auth/next-js";


// Create a global instance to avoid multiple connections in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite", 
  }),
  
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({url, user}) => {
      await sendEmail(url, user);
    }
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
          console.warn(this.input, "fhdjfvjdhg")
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
  },
  plugins: [nextCookies()]
});

export const authSessionServer = async () => {
  return await auth.api.getSession({headers: await headers()});
}


export type Session = typeof auth.$Infer.Session;