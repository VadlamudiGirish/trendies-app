import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt", // we’ll store our custom fields in the JWT
  },
  callbacks: {
    // 1) Put user.id, referralCode, referredCount into the JWT on sign in
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.referralCode = user.referralCode;
        token.referredCount = user.referredCount;
      }
      return token;
    },
    // 2) Always rebuild session.user from token (never mutate an undefined session.user)
    async session({ session, token }) {
      return {
        ...session,
        user: {
          name: session.user?.name,
          email: session.user?.email,
          image: session.user?.image,
          id: token.id as string,
          referralCode: token.referralCode as string,
          referredCount: token.referredCount as number,
        },
      };
    },
    // 3) Force all NextAuth redirects (signin, callback, error) back to your home page
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
