import { JWT } from "next-auth/jwt";

async function refreshAccessToken(token: JWT) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const res = await fetch(`${backendUrl}/Auth/RefreshTokenLogin`, {
      method: "POST",
      body: JSON.stringify({ refreshToken: token.refreshToken }),
      headers: { "Content-Type": "application/json" },
    });

    const refreshedData = await res.json();

    if (!res.ok || !refreshedData.refreshToken) {
      return { ...token, error: "RefreshAccessTokenError" };
    }

    const { accessToken, expiresIn, refreshToken } = refreshedData.data;

    return {
      ...token,
      accessToken,
      refreshToken: refreshToken ?? token.refreshToken,
      accessTokenExpires: Date.now() + expiresIn * 1000,
    };
  } catch (error) {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export default refreshAccessToken;
