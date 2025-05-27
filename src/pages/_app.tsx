import "@mantine/core/styles.css";

import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <MantineProvider withCssVariables>
          <Component {...pageProps} />
        </MantineProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
