"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import GraphqlProvider from "./GrapqhlProvider";

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <GraphqlProvider>{children}</GraphqlProvider>
    </SessionProvider>
  );
}
