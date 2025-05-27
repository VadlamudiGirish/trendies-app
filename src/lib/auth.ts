import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

/**
 * NextAuth configuration options for Facebook OAuth
 * and Prisma adapter integration.
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  // Custom sign-in page (optional)
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    /**
     * jwt callback:
     * - Called whenever a JWT is created or updated.
     * - Persist the user ID on the token.
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    /**
     * session callback:
     * - Called whenever a session is checked.
     * - Make the user ID available on session.user.
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
