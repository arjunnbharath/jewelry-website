import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(
    request,
    response,
    sessionOptions,
  );

  if (!session.isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
