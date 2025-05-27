import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import { Button } from "@mantine/core";
import { parse } from "cookie";
import { prisma } from "@/lib/prisma";
import { CopyInput } from "@/components/ui/CopyInput";

interface DashboardProps {
  link: string;
  referredCount: number;
}

export default function Dashboard({ link, referredCount }: DashboardProps) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-between">
        Dashboard
        <Button variant="outline" size="sm" onClick={() => signOut()}>
          Sign Out
        </Button>
      </h1>

      <CopyInput label="Your unique referral link:" value={link} />

      <p className="mt-4 text-gray-700">
        You’ve referred <strong>{referredCount}</strong>{" "}
        {referredCount === 1 ? "friend" : "friends"} so far!
      </p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<DashboardProps> = async (
  ctx
) => {
  // 1) Ensure user is signed in
  const session = await getSession({ req: ctx.req });
  if (!session?.user?.email) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  // 2) Read referral cookie
  const cookies = ctx.req.headers.cookie ?? "";
  const { referral: referralCode } = parse(cookies);

  // 3) Load current user
  let user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  // 4) Credit referrer if not already done and prevent self-referral
  if (referralCode && user && user.referredBy === null) {
    const referrer = await prisma.user.findUnique({ where: { referralCode } });
    if (referrer && referrer.id !== user.id) {
      await prisma.$transaction([
        // a) Mark this user as referred by the referrer
        prisma.user.update({
          where: { id: user.id },
          data: { referredBy: referrer.id },
        }),
        // b) Increment the referrer's count
        prisma.user.update({
          where: { id: referrer.id },
          data: { referredCount: { increment: 1 } },
        }),
      ]);
    }
    // Clear the referral cookie (whether credited or not)
    ctx.res.setHeader("Set-Cookie", "referral=; Path=/; Max-Age=0");

    // Reload the updated user record
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
  }

  // 5) Construct the referral link and pass referredCount
  const link = `${process.env.NEXTAUTH_URL}/signup?ref=${user!.referralCode}`;
  const referredCount = user!.referredCount;

  return {
    props: { link, referredCount },
  };
};
