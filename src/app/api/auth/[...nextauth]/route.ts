import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

          const res = await fetch(`${backendUrl}/Auth/Login`, {
            method: "POST",
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "User-Agent": "NextAuth/1.0",
            },
          });

          console.log("Backend response status:", res.status);
          console.log(
            "Backend response headers:",
            Object.fromEntries(res.headers.entries())
          );

          if (!res.ok) {
            const errorText = await res.text();
            console.error("API Error:", {
              status: res.status,
              statusText: res.statusText,
              body: errorText,
            });

            // 400 hatası için daha detaylı bilgi
            if (res.status === 400) {
              console.error(
                "Bad Request - Check request format and backend API specification"
              );
            }

            return null;
          }

          const user = await res.json();
          //console.log("API Response:", user);

          if (user) {
            return user;
          }

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
});

export const { GET, POST } = handlers;
