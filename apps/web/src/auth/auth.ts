import NextAuth, { NextAuthResult } from "next-auth";
import { credentialsProvider } from "./providers/credentials";
import { googleProvider } from "./providers/google";
import { callbacks } from "./callbacks";
import { validateConfig } from "./config";
import "next-auth/jwt";

validateConfig();

const result = NextAuth({
  providers: [googleProvider, credentialsProvider],
  session: {
    strategy: "jwt",
  },
  callbacks,
});

export const handlers: NextAuthResult["handlers"] = result.handlers;
export const auth: NextAuthResult["auth"] = result.auth;
export const signIn: NextAuthResult["signIn"] = result.signIn;
export const signOut: NextAuthResult["signOut"] = result.signOut;
