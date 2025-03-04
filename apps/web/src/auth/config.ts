export const authErrorPage = "/auth/error";

export const validateConfig = () => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }
};
