import { NextAuthConfig } from "next-auth";
import { authErrorPage } from "./config";

export const callbacks: NextAuthConfig["callbacks"] = {
  async signIn({ account, user, email }) {
    if (!account?.provider) return true;
    if (account.provider === "google") {
      if (account) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token: account.id_token }),
            }
          );

          if (!response.ok) {
            const responseJson = await response.json();
            user.error = responseJson.detail;
            throw new Error(responseJson.detail);
          }

          const data = await response.json();
          user.apiToken = data.access_token;
          return true;
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
          const errorCode = errorMessage.startsWith("existing") && errorMessage;
          return `${authErrorPage}${errorCode ? `?error=${errorCode}` : ""}`;
        }
      }
    }
    if (account.provider === "credentials") {
      if (user) {
        return true;
      }
    }
    return false;
  },
  async jwt({ token, account, user }) {
    if (account) token.apiToken = user.apiToken;

    return token;
  },
  async session({ session, token }) {
    if (token.apiToken) session.apiToken = token.apiToken;

    return session;
  },
};
