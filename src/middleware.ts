import { NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

import {
  publicRoutes,
  signInRedirectUrl,
  authRoutes,
  adminRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);
export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAdmin = adminRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return; //return passes control
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(signInRedirectUrl, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute)
    return NextResponse.redirect(new URL("/signin", nextUrl));
  return; // all ok
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
