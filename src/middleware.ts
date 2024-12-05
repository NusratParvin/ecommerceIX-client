import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { decodeToken } from "@/lib/verifyToken";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Access cookies from the request
  const accessToken = request.cookies.get("accessToken")?.value;
  // console.log(accessToken);
  // If no token is present
  if (!accessToken) {
    // Allow access to public routes like login and register
    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.next();
    }

    // Redirect to login for protected routes
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  // If token is present, decode it
  try {
    const decodedToken: any = decodeToken(accessToken);

    const { role } = decodedToken;

    // Prevent logged-in users from accessing the register page
    if (pathname === "/register") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Role-based access control for dashboards
    if (role === "ADMIN" && pathname.startsWith("/admin")) {
      return NextResponse.next(); // Allow admin to access their dashboard
    } else if (role === "VENDOR" && pathname.startsWith("/vendor")) {
      return NextResponse.next(); // Allow vendor to access their dashboard
    } else if (role === "USER" && pathname.startsWith("/user")) {
      return NextResponse.next(); // Allow user to access their dashboard
    } else {
      // If trying to access an unauthorized role-based dashboard
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error("Token verification failed:", error);

    // Token verification failed; redirect to login
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/vendor/:path*",
    "/user/:path*",
    "/login",
    "/register",
  ],
};
