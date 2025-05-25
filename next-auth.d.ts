import { DefaultUser, DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extend the User model to include an `id` property.
   */
  interface User extends DefaultUser {
    id: string;
  }

  /**
   * Extend the Session to include `user.id`.
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /**
   * Persist the user `id` on the JWT token.
   */
  interface JWT extends DefaultJWT {
    id: string;
  }
}
