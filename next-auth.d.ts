import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * API route handler for NextAuth.
 * Initializes NextAuth with our authOptions.
 */
export default function authHandler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authOptions);
}

// next-auth.d.ts (at project root)
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /** Extend the built-in User type */
  interface User extends DefaultUser {
    id: string;
    referralCode: string;
    referredCount: number;
  }

  /** Ensure session.user has your custom fields */
  interface Session extends DefaultSession {
    user: {
      id: string;
      referralCode: string;
      referredCount: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Persist custom fields in the JWT */
  interface JWT extends DefaultJWT {
    id: string;
    referralCode: string;
    referredCount: number;
  }
}
