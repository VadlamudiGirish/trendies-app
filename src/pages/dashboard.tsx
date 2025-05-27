import { GetServerSideProps } from "next";
import { signOut } from "next-auth/react";
import { Button } from "@mantine/core";
import { prisma } from "@/lib/prisma";
import { CopyInput } from "@/components/ui/CopyInput";
import { getSession } from "next-auth/react";

export default function Dashboard({ link }: { link: string }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-between">
        Dashboard
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          Sign Out
        </Button>
      </h1>
      <CopyInput label="Your unique referral link:" value={link} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  const email = session.user.email;
  if (!email) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return {
    props: {
      link: `${process.env.NEXTAUTH_URL}/signup?ref=${user?.referralCode}`,
    },
  };
};
