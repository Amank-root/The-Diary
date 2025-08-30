import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    
    const isAuthPage = pathname.startsWith("/auth");
    const isApiRoute = pathname.startsWith("/api");
    
    // Define all protected routes including root
    const isProtectedPage = pathname === "/" ||
                           pathname.startsWith("/dashboard") ||
                           pathname.startsWith("/notes") ||
                           pathname.startsWith("/explore") ||
                           pathname.startsWith("/profile") ||
                           pathname.startsWith("/diary") ||
                           pathname.startsWith("/page") ||
                           pathname.startsWith("/connections");
    
    // Skip middleware for API routes
    if (isApiRoute) {
      return NextResponse.next();
    }

    // Check for session token in cookies
    const token = request.cookies.get("better-auth.session_token")?.value;

    // Redirect authenticated users away from auth pages to explore
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/explore", request.url));
    }

    // Redirect unauthenticated users to sign-in for protected routes
    if (!token && isProtectedPage) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    // Handle root path specifically - redirect authenticated users to explore
    if (token && pathname === "/") {
      return NextResponse.redirect(new URL("/explore", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // "/",
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

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";


// export async function middleware(request: NextRequest) {
//   try {
//     const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
//     const isProtectedPage = request.nextUrl.pathname.startsWith("/dashboard");
//     const isApiRoute = request.nextUrl.pathname.startsWith("/api");
    
//     // Skip middleware for API routes
//     if (isApiRoute) {
//       return NextResponse.next();
//     }

//     // Check for session token in cookies
//     const token = request.cookies.get("better-auth.session_token")?.value;

//     // Redirect authenticated users away from auth pages
//     if (token && isAuthPage) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }

//     // Redirect unauthenticated users to sign-in
//     if (!token && isProtectedPage) {
//       return NextResponse.redirect(new URL("/auth/sign-in", request.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Middleware error:", error);
//     return NextResponse.next();
//   }
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/auth/:path*"],
// };