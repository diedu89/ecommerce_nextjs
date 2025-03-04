"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const createProviderMessage = (provider: string) =>
  `This account is already linked to a ${provider} login. Please sign in with ${provider} instead.`;

const providerMessages: Record<string, string> = {
  existing_google: createProviderMessage("Google"),
  existing_github: createProviderMessage("GitHub"),
  existing_facebook: createProviderMessage("Facebook"),
  existing_password: createProviderMessage("password"),
};

const getErrorMessage = (error?: string | null) => {
  console.log("Received error:", error);

  if (!error) {
    console.log("No error provided");
    return "Unknown error occurred";
  }

  const message = providerMessages[error];
  console.log("Provider message found:", message ? "yes" : "no");

  return message || "Unknown error occurred";
};

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorMessage = getErrorMessage(error);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-600 mb-8">{errorMessage}</p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
