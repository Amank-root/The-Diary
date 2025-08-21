import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function middleware(request: NextRequest) {
  try {
    const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
    const isProtectedPage = request.nextUrl.pathname.startsWith("/dashboard");
    const isApiRoute = request.nextUrl.pathname.startsWith("/api");
    
    // Skip middleware for API routes
    if (isApiRoute) {
      return NextResponse.next();
    }

    // Check for session token in cookies
    const token = request.cookies.get("better-auth.session_token")?.value;

    // Redirect authenticated users away from auth pages
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Redirect unauthenticated users to sign-in
    if (!token && isProtectedPage) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};