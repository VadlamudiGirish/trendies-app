import { getProviders, signIn, ClientSafeProvider } from "next-auth/react";
import type { GetServerSideProps } from "next";
import { Button, Container, Stack, Title } from "@mantine/core";

interface SignInProps {
  providers: Record<string, ClientSafeProvider>;
}

export default function SignIn({ providers }: SignInProps) {
  return (
    <Container
      size="xs"
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <Title order={2} className="mb-6">
        Sign in to Trendies
      </Title>
      <Stack gap="md" className="w-full">
        {Object.values(providers).map((provider) => (
          <Button
            key={provider.id}
            fullWidth
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Sign in with {provider.name}
          </Button>
        ))}
      </Stack>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<SignInProps> = async () => {
  const providers = await getProviders();
  return {
    props: { providers: providers ?? {} },
  };
};
