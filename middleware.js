import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Admin routes & login page
  const isAdminRoute = pathname.startsWith("/admin-7qwx");
  const isLoginPage = pathname === "/admin-7qwx/login";

  // Cookie set by backend
  const adminToken = request.cookies.get("admin_token")?.value;

  // 1️⃣ Protect admin routes (redirect to login if not authenticated)
  if (isAdminRoute && !adminToken && !isLoginPage) {
    const loginUrl = new URL("/admin-7qwx/login", request.url);
    // Set redirect to original requested path
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2️⃣ Prevent logged-in admin from visiting login page
  if (isLoginPage && adminToken) {
    // Redirect to dashboard (or you can change this to /fake if you want)
    return NextResponse.redirect(
      new URL("/admin-7qwx/smDashboard", request.url)
    );
  }

  return NextResponse.next();
}

// Apply middleware to all admin routes
export const config = {
  matcher: ["/admin-7qwx/:path*"],
};
