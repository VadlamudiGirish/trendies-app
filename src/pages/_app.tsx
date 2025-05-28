import "@/styles/globals.css";
import "@mantine/core/styles.css";

import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
          <div className="pt-16 pb-16 h-screen overflow-auto">
            <Component {...pageProps} />
          </div>
          <Footer />
        </MantineProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
