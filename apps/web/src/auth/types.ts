import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    apiToken?: string;
    error?: string;
  }
  interface User {
    apiToken?: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    apiToken?: string;
    error?: string;
  }
}
