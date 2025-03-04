import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  fromError,
  Observable,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { auth } from "@/auth/auth";

export const { PreloadQuery } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    fetchOptions: {
      cache: "no-store",
    },
    fetch: async (uri, options) => {
      const session = await auth();

      // Log request details
      console.log("GraphQL Request:", {
        uri,
        method: options?.method,
        headers: options?.headers,
        sessionExists: !!session,
        hasApiToken: !!session?.apiToken,
      });

      if (session?.apiToken) {
        options = {
          ...options,
          headers: {
            ...(options?.headers ?? {}),
            Authorization: `Bearer ${session.apiToken}`,
          },
        };
      }

      const response = await fetch(uri, options);

      console.log("GraphQL Response:", {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
      });

      return response;
    },
  });

  const logLink = new ApolloLink((operation, forward) => {
    console.log(`Starting operation ${operation.operationName}`);

    return forward(operation).map((result) => {
      console.log(`Completed operation ${operation.operationName}`, {
        data: result.data,
        errors: result.errors,
      });
      return result;
    });
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: logLink.concat(httpLink),
  });
});
