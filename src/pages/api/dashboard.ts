import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { parse } from "cookie";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1) Ensure the user is authenticated
  const session = await getSession({ req });
  if (!session?.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 2) Read referral cookie
  const cookies = req.headers.cookie ?? "";
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
    res.setHeader("Set-Cookie", "referral=; Path=/; Max-Age=0");
    // Reload the updated user record
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
  }

  // 5) Build and return the referral link and count
  return res.status(200).json({
    link: `${process.env.NEXTAUTH_URL}/signup?ref=${user?.referralCode}`,
    referredCount: user?.referredCount ?? 0,
  });
}
