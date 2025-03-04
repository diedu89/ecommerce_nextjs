import Credentials from "next-auth/providers/credentials";
import { User } from "next-auth";

export const credentialsProvider = Credentials({
  name: "Password",
  credentials: {
    username: {
      label: "Email",
      placeholder: "username",
    },
    password: {
      label: "Password",
      type: "password",
    },
  },
  async authorize(credentials) {
    if (!credentials?.username || !credentials?.password) {
      return null;
    }

    const formData = new URLSearchParams();
    formData.append(
      "username",
      (credentials.username as string).split("@")[0] || ""
    );
    formData.append("password", credentials.password as string);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );

      if (response.status === 401) {
        return null;
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
      }

      const data = await response.json();
      return {
        id: data.id,
        email: credentials.username,
        apiToken: data.access_token,
      } as User;
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("existing")) {
        throw new Error(error.message);
      }
      throw error;
    }
  },
});
