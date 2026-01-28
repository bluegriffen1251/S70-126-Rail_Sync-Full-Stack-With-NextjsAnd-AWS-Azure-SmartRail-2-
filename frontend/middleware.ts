import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔍 DEBUG: Log every time middleware runs on a protected route
  console.log(`[Middleware] Checking access for path: ${pathname}`);

  // 1. Define Protected Routes
  const protectedRoutes = ["/dashboard", "/users"];

  // 2. Check if current path is protected
  const isProtected = protectedRoutes.some((route) => 
    pathname.startsWith(route)
  );

  // 3. Check for Token
  if (isProtected) {
    const token = req.cookies.get("token");

    // 🔍 DEBUG: Check if the cookie is visible
    console.log(`[Middleware] Token cookie found? ${token ? "YES" : "NO"}`);

    // If no token, redirect to Login
    if (!token) {
      console.log("[Middleware] ⛔ Access Denied. Redirecting to /login");
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    console.log("[Middleware] ✅ Access Granted.");
  }

  return NextResponse.next();
}

// Optimization: Only run on relevant paths
export const config = {
  matcher: ["/dashboard/:path*", "/users/:path*"],
};