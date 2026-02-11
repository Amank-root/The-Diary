import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const protectedRoutes = [
  '/dashboard',
  '/notes',
  '/explore',
  '/profile',
  '/diary',
  '/page',
  '/connections',
];

const authRoutes = [
  '/auth/sign-in',
  '/auth/sign-up',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/verify-email'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith('/api');

  if (
    isApiRoute ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') || 
    pathname.startsWith('/verify-email')
  ) {
    // Allow API routes without authentication
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);
  const isHome = pathname === '/';
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute =
    isHome || protectedRoutes.some((route) => pathname.startsWith(route));

  if (isAuthRoute && !sessionCookie) {
    return NextResponse.next();
  }

  if (isAuthRoute && sessionCookie) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (isProtectedRoute && !sessionCookie) {
    console.log(pathname)
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/notes/:path*',
    '/explore/:path*',
    '/profile/:path*',
    '/diary/:path*',
    '/page/:path*',
    '/connections/:path*',
    '/auth/:path*',
  ],
};

// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {
//   try {
//     const { pathname } = request.nextUrl;

//     const isAuthPage = pathname.startsWith("/auth");
//     const isApiRoute = pathname.startsWith("/api");

//     // Define all protected routes excluding root initially
//     const isProtectedPage = pathname.startsWith("/dashboard") ||
//                            pathname.startsWith("/notes") ||
//                            pathname.startsWith("/explore") ||
//                            pathname.startsWith("/profile") ||
//                            pathname.startsWith("/diary") ||
//                            pathname.startsWith("/page") ||
//                            pathname.startsWith("/connections");

//     // Skip middleware for API routes
//     if (isApiRoute || isAuthPage) {
//       return NextResponse.next();
//     }

//     // Check for session token in cookies - both possible cookie names
//     const token = request.cookies.get("better-auth.session_token")?.value ||
//                   request.cookies.get("authjs.session-token")?.value;

//     // Additional validation: check if token exists and is not empty
//     const hasValidToken = token && token.length > 0;

//     // Redirect authenticated users away from auth pages to explore
//     if (hasValidToken && isAuthPage) {
//       return NextResponse.redirect(new URL("/explore", request.url));
//     }

//     // Handle root path - redirect to explore if authenticated, otherwise to sign-in
//     if (pathname === "/") {
//       if (!hasValidToken) {
//       //   return NextResponse.redirect(new URL("/", request.url));
//       // } else {
//         return NextResponse.redirect(new URL("/auth/sign-in", request.url));
//       }
//     }

//     // Redirect unauthenticated users to sign-in for protected routes
//     if (!hasValidToken && isProtectedPage) {

//       return NextResponse.redirect(new URL("/auth/sign-in", request.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//      console.error("Middleware error:", error);
//     return NextResponse.next();
//   }

// }

// export const config = {
//   matcher: [
//     "/",
//     "/notes/:path*",
//     "/dashboard/:path*",
//     "/auth/:path*",
//     "/explore/:path*",
//     "/profile/:path*",
//     "/diary/:path*",
//     "/page/:path*",
//     "/connections/:path*"
//   ],
// };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const isAuthPage = pathname.startsWith("/auth");
//   const isApiRoute = pathname.startsWith("/api");

//   // Skip middleware for API routes and static files
//   if (isApiRoute || pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
//     return NextResponse.next();
//   }

//   // Check for session token in cookies - try multiple possible names
//   const sessionToken = request.cookies.get("better-auth.session_token")?.value ||
//                        request.cookies.get("better-auth.session-token")?.value ||
//                        request.cookies.get("authjs.session-token")?.value ||
//                        request.cookies.get("next-auth.session-token")?.value;

//   // Log cookies for debugging in production
//   if (process.env.NODE_ENV === "production") {
//     const cookieNames = ["better-auth.session_token", "better-auth.session-token", "authjs.session-token", "next-auth.session-token"];
//     const cookieValues: Record<string, string | undefined> = {};
//     cookieNames.forEach(name => {
//       cookieValues[name] = request.cookies.get(name)?.value;
//     });
//     console.log(`[Middleware] Path: ${pathname}, Cookies:`, cookieValues);
//   }

//   // More robust token validation
//   let hasValidToken = sessionToken &&
//                       sessionToken.length > 20 && // Better Auth tokens are typically longer
//                       !sessionToken.includes("deleted") && // Check for deleted tokens
//                       sessionToken !== "undefined";

//   // If no cookie-based session found, try to validate via API (only for protected routes)
//   if (!hasValidToken && !isAuthPage) {
//     try {
//       const sessionResponse = await fetch(new URL("/api/auth/get-session", request.url), {
//         headers: {
//           "Cookie": request.headers.get("cookie") || "",
//         },
//       });

//       if (sessionResponse.ok) {
//         const session = await sessionResponse.json();
//         hasValidToken = !!session?.user;

//         if (process.env.NODE_ENV === "production") {
//           console.log(`[Middleware] API session check result:`, { hasUser: !!session?.user });
//         }
//       }
//     } catch (error) {
//       if (process.env.NODE_ENV === "production") {
//         console.log(`[Middleware] Session API check failed:`, error);
//       }
//       hasValidToken = false;
//     }
//   }

//   // Debug logging for production
//   if (process.env.NODE_ENV === "production") {
//     console.log(`[Middleware] Path: ${pathname}, Token exists: ${!!sessionToken}, Token length: ${sessionToken?.length || 0}, Valid: ${hasValidToken}`);
//   }

//   // Allow access to auth pages for unauthenticated users
//   if (!hasValidToken && isAuthPage) {
//     return NextResponse.next();
//   }

//   // Redirect authenticated users away from auth pages
//   if (hasValidToken && isAuthPage) {
//     return NextResponse.redirect(new URL("/explore", request.url));
//   }

//   // Handle root path
//   if (pathname === "/") {
//     if (!hasValidToken) {
//     //   return NextResponse.redirect(new URL("/explore", request.url));
//     // } else {
//       return NextResponse.redirect(new URL("/auth/sign-in", request.url));
//     }
//   }

//   // Define protected routes
//   const protectedRoutes = ["/dashboard", "/notes", "/explore", "/profile", "/diary", "/page", "/connections"];
//   const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

//   // Redirect unauthenticated users to sign-in for protected routes
//   if (!hasValidToken && isProtectedRoute) {
//     return NextResponse.redirect(new URL("/auth/sign-in", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/",
//     "/notes/:path*",
//     "/dashboard/:path*",
//     "/auth/:path*",
//     "/explore/:path*",
//     "/profile/:path*",
//     "/diary/:path*",
//     "/page/:path*",
//     "/connections/:path*"
//   ],
// };
