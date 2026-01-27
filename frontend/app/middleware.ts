import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Using jose for Edge compatibility

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Define paths that require protection
  if (pathname.startsWith("/api/admin") || pathname.startsWith("/api/users")) {
    
    // 2. Extract Token
    const authHeader = req.headers.get("authorization");
    
    // Robust check: Ensure it starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log(`[Middleware] 🔴 Blocked: Missing or malformed header for ${pathname}`);
      return NextResponse.json(
        { success: false, message: "Token missing or malformed" }, 
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      // 3. Verify Token
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      const userRole = payload.role as string;
      const userEmail = payload.email as string;

      // 4. RBAC: Enforce Admin Only
      if (pathname.startsWith("/api/admin") && userRole !== "admin") {
        console.log(`[Middleware] ⛔ Access Denied: User ${userEmail} (Role: ${userRole}) tried to access Admin route`);
        return NextResponse.json(
          { success: false, message: "Access denied: Admins only" }, 
          { status: 403 }
        );
      }

      // 5. Success! Attach info and pass through
      console.log(`[Middleware] 🟢 Access Granted: ${userEmail} (${userRole}) -> ${pathname}`);
      
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-email", userEmail);
      requestHeaders.set("x-user-role", userRole);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

    } catch (error) {
      console.log(`[Middleware] 🔴 Blocked: Invalid Token for ${pathname}`);
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" }, 
        { status: 403 }
      );
    }
  }

  // Allow all other routes to pass through
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};