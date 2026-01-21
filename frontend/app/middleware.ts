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
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token missing" }, 
        { status: 401 }
      );
    }

    try {
      // 3. Verify Token (Edge compatible)
      const secret = new TextEncoder().encode(JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      
      // payload.role is accessed from the decoded JWT
      const userRole = payload.role as string;
      const userEmail = payload.email as string;

      // 4. RBAC: Enforce Admin Only for /api/admin
      if (pathname.startsWith("/api/admin") && userRole !== "admin") {
        return NextResponse.json(
          { success: false, message: "Access denied: Admins only" }, 
          { status: 403 }
        );
      }

      // 5. Attach user info to headers for downstream use
      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-email", userEmail);
      requestHeaders.set("x-user-role", userRole);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" }, 
        { status: 403 }
      );
    }
  }

  // Allow all other routes to pass through
  return NextResponse.next();
}

// Optimization: Matcher config to run middleware only on API routes
export const config = {
  matcher: '/api/:path*',
};