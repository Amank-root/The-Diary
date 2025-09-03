import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SessionProvider from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Diary',
    default: 'The Diary',
  },
  icons: "/icon.svg",
  description: 'A Diary to keep you connected with all your loved ones even when you are apart.',
  metadataBase: new URL('https://diary-app.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} select-none antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <ThemeProvider attribute={'class'} defaultTheme="system" disableTransitionOnChange>
            {/* <Container> */}
              {children}
              <Toaster richColors />
            {/* </Container> */}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
