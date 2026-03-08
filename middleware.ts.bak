import { NextResponse, type NextRequest } from "next/server";

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/* routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // /admin/login is always accessible
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check admin session cookie
  const sessionCookie = request.cookies.get("admin_session")?.value;

  if (!ADMIN_SECRET || !sessionCookie || sessionCookie !== ADMIN_SECRET) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
