import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isAuthPage = pathname.startsWith("/auth");
  const isApiRoute = pathname.startsWith("/api");
  
  // Skip middleware for API routes and static files
  if (isApiRoute || pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }

  // Check for session token in cookies
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;
  
  // More robust token validation
  const hasValidToken = sessionToken && 
                       sessionToken.length > 20 && // Better Auth tokens are typically longer
                       !sessionToken.includes("deleted") && // Check for deleted tokens
                       sessionToken !== "undefined";

  // Debug logging for production
  if (process.env.NODE_ENV === "production") {
    console.log(`[Middleware] Path: ${pathname}, Token exists: ${!!sessionToken}, Valid: ${hasValidToken}`);
  }

  // Allow access to auth pages for unauthenticated users
  if (!hasValidToken && isAuthPage) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth pages
  if (hasValidToken && isAuthPage) {
    return NextResponse.redirect(new URL("/explore", request.url));
  }

  // Handle root path
  if (pathname === "/") {
    if (!hasValidToken) {
      // r.
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/notes", "/explore", "/profile", "/diary", "/page", "/connections"];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Redirect unauthenticated users to sign-in for protected routes
  if (!hasValidToken && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/notes/:path*",
    "/dashboard/:path*",
    "/auth/:path*",
    "/explore/:path*",
    "/profile/:path*",
    "/diary/:path*",
    "/page/:path*",
    "/connections/:path*"
  ],
};