import { useRouter } from "next/router";
import { useSession, signIn, ClientSafeProvider } from "next-auth/react";
import { Container, Stack, Title } from "@mantine/core";
import { Button } from "@/components/ui/Button";
import useSWR from "swr";

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data: providers, error } = useSWR<
    Record<string, ClientSafeProvider>,
    Error
  >("/api/auth/providers");

  // 1) While checking session
  if (status === "loading") {
    return <p>Loading session…</p>;
  }

  // 2) If already signed in, redirect to home
  if (session) {
    router.replace("/");
    return null;
  }

  // 3) Error loading providers
  if (error) {
    return <p>Failed to load authentication providers.</p>;
  }

  // 4) Waiting on providers
  if (!providers) {
    return <p>Loading login options…</p>;
  }

  // 5) Render sign-in buttons
  return (
    <Container
      size="xs"
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <Title order={2} className="mb-6">
        Sign in to Trendies
      </Title>
      <Stack gap="md" className="w-full">
        {(Object.values(providers!) as ClientSafeProvider[]).map((provider) => (
          <Button
            key={provider.id}
            fullWidth
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            color="black"
          >
            Sign in with {provider.name}
          </Button>
        ))}
      </Stack>
    </Container>
  );
}
