import "@/styles/globals.css";
import "@mantine/core/styles.css";

import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import Header from "@/components/Header";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <MantineProvider withCssVariables>
          <Header />
          <Component {...pageProps} />
        </MantineProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
