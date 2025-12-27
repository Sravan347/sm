import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin-qwe");
  const isLoginPage = pathname === "/admin-qwe/login";

  const auth = request.cookies.get("admin_auth");

  // If admin route & not logged in → redirect to login
  if (isAdminRoute && !auth && !isLoginPage) {
    const loginUrl = new URL("/admin-7qwx/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in & trying to access login → go to dashboard
  if (isLoginPage && auth) {
    return NextResponse.redirect(
      new URL("/admin-7qwx/dashboard", request.url)
    );
  }

  return NextResponse.next();
}
