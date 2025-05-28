import "@/styles/globals.css";
import "@mantine/core/styles.css";

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { MantineProvider } from "@mantine/core";
import { SessionProvider, useSession } from "next-auth/react";
import { SWRConfig } from "swr";
import useSWR from "swr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ReferralInitializer({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const { mutate } = useSWR("/api/dashboard");
  const [hasMutated, setHasMutated] = useState(false);

  useEffect(() => {
    if (
      status === "authenticated" &&
      !hasMutated &&
      document.cookie.includes("referral=")
    ) {
      mutate();
      setHasMutated(true);
    }
  }, [status, hasMutated, mutate]);

  return <>{children}</>;
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const fetcher = (url: string) =>
    fetch(url, { credentials: "include" }).then((res) => res.json());

  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <MantineProvider withCssVariables>
          <Header />
          <ReferralInitializer>
            <main className="pt-16 pb-16 h-screen overflow-auto">
              <Component {...pageProps} />
            </main>
          </ReferralInitializer>
          <Footer />
        </MantineProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
