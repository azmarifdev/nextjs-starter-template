import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { verifySessionToken } from "@/lib/session";

const protectedRoutes = ["/dashboard", "/users", "/projects", "/tasks"];
const authRoutes = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.includes(pathname);

  const session = token ? await verifySessionToken(token) : null;
  const isSignedIn = Boolean(session);

  if (isProtected && !isSignedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute && isSignedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token && !isSignedIn) {
    const response = NextResponse.next();
    response.cookies.set(AUTH_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/"
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/projects/:path*",
    "/tasks/:path*",
    "/login",
    "/register"
  ]
};
