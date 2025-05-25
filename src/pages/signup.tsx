import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignupRedirect() {
  const router = useRouter();

  useEffect(() => {
    const { ref } = router.query;
    // If a referral code is present, store it as a cookie
    if (typeof ref === "string") {
      document.cookie = `referral=${ref}; path=/; max-age=${60 * 60 * 24}`;
    }
    // Redirect to the NextAuth sign-in page
    router.replace("/api/auth/signin");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Redirecting to sign in…</p>
    </div>
  );
}
