import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Fix for NextAuth in preview environment
if (process.env.APP_URL && !process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.APP_URL;
}

export default withAuth(
  function middleware() {
    // Custom logic if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
