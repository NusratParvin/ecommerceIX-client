/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { decodeToken } from "@/lib/verifyToken";
import { getCookies } from "./services/AuthService";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  // console.log("Cookies:", request.cookies); // Ensure cookies are present
  // console.log("Headers:", request.headers);

  // console.log("AccessToken:", request.cookies.get("accessToken"));
  // console.log("Cookies in Middleware:", request.cookies.getAll());

  // const accessToken = request.cookies.get("accessToken")?.value;
  // console.log(accessToken);
  const { success, accessToken, refreshToken } = getCookies();

  if (success) {
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
  } else {
    console.warn("Required cookies are missing.");
  }

  // If no token is present
  if (!accessToken) {
    // Allow access to public routes like login and register
    if (pathname === "/register") {
      return NextResponse.next();
    }
    if (pathname === "/login") {
      return NextResponse.next();
    }

    // Redirect to login for protected routes
    return NextResponse.redirect(
      new URL(`/?redirect=${pathname}`, request.url)
    );
  }

  // If token is present, decode it
  try {
    const decodedToken: any = decodeToken(accessToken);
    // console.log("Decoded Token:", decodedToken);

    const { role } = decodedToken;

    // Prevent logged-in users from accessing the register page
    if (pathname === "/register") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Role-based access control for dashboards
    if (role === "ADMIN" && pathname.startsWith("/admin")) {
      return NextResponse.next(); // Allow admin to access their dashboard
      // if (pathname.startsWith(`/${role.toLowerCase()}`)) {
      //   return NextResponse.next(); // Allow correct role-based access
      // }
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
      new URL(`/?redirect=${pathname}`, request.url)
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

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { decodeToken } from "./lib/verifyToken";

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Access cookies from the request in middleware
//   const accessToken = request.cookies.get("accessToken")?.value;
//   console.log(accessToken, "accesstoken");
//   if (!accessToken) {
//     // If no token, redirect to login page unless it's a public route
//     if (pathname === "/login" || pathname === "/register") {
//       return NextResponse.next(); // Allow access to login/register
//     } else {
//       return NextResponse.redirect(
//         new URL(`/login?redirect=${pathname}`, request.url)
//       );
//     }
//   }

//   // Verify token (you can decode it to check user roles, etc.)
//   try {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const decodedToken: any = decodeToken(accessToken);

//     // Check user role, permissions, etc., based on the decoded token
//     if (decodedToken?.role === "ADMIN" && pathname.startsWith("/admin")) {
//       return NextResponse.next(); // Allow access to admin route
//     } else if (
//       decodedToken?.role === "VENDOR" &&
//       pathname.startsWith("/vendor")
//     ) {
//       return NextResponse.next(); // Allow access to user profile
//     } else {
//       // If role does not match, redirect to a not authorized page
//       return NextResponse.redirect(new URL("/", request.url));
//     }
//   } catch (error) {
//     console.log(error);
//     // Token verification failed, redirect to login
//     return NextResponse.redirect(
//       new URL(`/login?redirect=${pathname}`, request.url)
//     );
//   }
// }

// export const config = {
//   matcher: ["/vendor/:page*", "/admin/:page*", "/login", "/register"],
// };
