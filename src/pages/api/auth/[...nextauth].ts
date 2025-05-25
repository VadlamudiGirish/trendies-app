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
