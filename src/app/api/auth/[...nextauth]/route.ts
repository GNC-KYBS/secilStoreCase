import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import refreshAccessToken from "@/utils/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
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
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) return null;

          const user = await res.json();

          if (user?.data?.accessToken) {
            if (res.ok && user?.data) {
              return user.data; // sadece token bilgilerini döndür
            }
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + user.expiresIn * 1000,
        };
      }

      // Token süresi bitmiş mi kontrol et
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // refreshToken ile yeni accessToken al
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpires: token.accessTokenExpires,
      };
      session.error = token.error;
      return session;
    },
  },
  pages: { signIn: "/login" },
  debug: process.env.NODE_ENV === "development",
});

export const { GET, POST } = handlers;
