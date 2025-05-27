import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CopyInput } from "@/components/ui/CopyInput";

export default function Dashboard({ link }: { link: string }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <CopyInput label="Your unique referral link:" value={link} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email || undefined },
  });

  const link = `${process.env.NEXTAUTH_URL}/referral/${user?.referralCode}`;

  return { props: { link } };
}
