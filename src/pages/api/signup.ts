import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ref } = req.query;

  if (typeof ref === "string") {
    // Set a 24-hour referral cookie
    res.setHeader(
      "Set-Cookie",
      `referral=${encodeURIComponent(ref)}; Path=/; Max-Age=${
        60 * 60 * 24
      }; HttpOnly; SameSite=Lax`
    );
  }

  // Redirect into the NextAuth sign-in flow
  res.redirect("/");
}
