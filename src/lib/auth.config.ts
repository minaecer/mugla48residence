import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLoginPage = nextUrl.pathname === "/admin/login";

      if (isOnAdmin) {
        if (isOnLoginPage) {
          if (isLoggedIn) {
            return Response.redirect(new URL("/admin/dashboard", nextUrl));
          }
          return true;
        }
        if (!isLoggedIn) return false; // Redirect to login
        return true;
      }

      return true;
    },
  },
  providers: [], // configured in auth.ts
};
