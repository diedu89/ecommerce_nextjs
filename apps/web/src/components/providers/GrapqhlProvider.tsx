"use client";

import { setVerbosity } from "ts-invariant";
import React, { PropsWithChildren } from "react";
import { HttpLink, ApolloLink, Observable } from "@apollo/client";
import { useSession, signOut } from "next-auth/react";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

setVerbosity("debug");

function makeClient(apiToken?: string) {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    fetchOptions: { cache: "no-store" },
    headers: {
      ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {}),
    },
  });

  const errorLink = new ApolloLink((operation, forward) => {
    return forward(operation).flatMap((response) => {
      return new Observable((observer) => {
        if (
          response.errors?.some(
            (error) =>
              error.message.includes("not authenticated") ||
              error.message.includes("token expired")
          )
        ) {
          console.log("Auth error detected, signing out...");
          signOut()
            .then(() => {
              observer.next(response);
              observer.complete();
            })
            .catch((error) => {
              console.error("Error during sign out:", error);
              observer.next(response);
              observer.complete();
            });
        } else {
          observer.next(response);
          observer.complete();
        }
      });
    });
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(httpLink),
  });
}

export default function GraphqlProvider({ children }: PropsWithChildren) {
  const { data: session } = useSession();
  const apiToken = session?.apiToken;

  return (
    <ApolloNextAppProvider makeClient={() => makeClient(apiToken)}>
      {children}
    </ApolloNextAppProvider>
  );
}
