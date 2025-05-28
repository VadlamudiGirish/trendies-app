import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Incorporate our custom User fields into the JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.referralCode = user.referralCode;
        token.referredCount = user.referredCount;
      }
      return token;
    },
    // Expose the custom fields on session.user
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.referralCode = token.referralCode as string;
        session.user.referredCount = token.referredCount as number;
      }
      return session;
    },
    // Always send users back home after sign in / sign out / errors
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
