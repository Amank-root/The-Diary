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

  // Check for session token in cookies - try multiple possible names
  const sessionToken = request.cookies.get("better-auth.session_token")?.value ||
                       request.cookies.get("better-auth.session-token")?.value ||
                       request.cookies.get("authjs.session-token")?.value ||
                       request.cookies.get("next-auth.session-token")?.value;

  // Log cookies for debugging in production
  if (process.env.NODE_ENV === "production") {
    const cookieNames = ["better-auth.session_token", "better-auth.session-token", "authjs.session-token", "next-auth.session-token"];
    const cookieValues: Record<string, string | undefined> = {};
    cookieNames.forEach(name => {
      cookieValues[name] = request.cookies.get(name)?.value;
    });
    console.log(`[Middleware] Path: ${pathname}, Cookies:`, cookieValues);
  }
  
  // More robust token validation
  let hasValidToken = sessionToken && 
                      sessionToken.length > 20 && // Better Auth tokens are typically longer
                      !sessionToken.includes("deleted") && // Check for deleted tokens
                      sessionToken !== "undefined";

  // If no cookie-based session found, try to validate via API (only for protected routes)
  if (!hasValidToken && !isAuthPage) {
    try {
      const sessionResponse = await fetch(new URL("/api/auth/get-session", request.url), {
        headers: {
          "Cookie": request.headers.get("cookie") || "",
        },
      });
      
      if (sessionResponse.ok) {
        const session = await sessionResponse.json();
        hasValidToken = !!session?.user;
        
        if (process.env.NODE_ENV === "production") {
          console.log(`[Middleware] API session check result:`, { hasUser: !!session?.user });
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "production") {
        console.log(`[Middleware] Session API check failed:`, error);
      }
      hasValidToken = false;
    }
  }

  // Debug logging for production
  if (process.env.NODE_ENV === "production") {
    console.log(`[Middleware] Path: ${pathname}, Token exists: ${!!sessionToken}, Token length: ${sessionToken?.length || 0}, Valid: ${hasValidToken}`);
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
    //   return NextResponse.redirect(new URL("/explore", request.url));
    // } else {
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