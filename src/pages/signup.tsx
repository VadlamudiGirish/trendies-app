import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignupRedirect() {
  const router = useRouter();

  useEffect(() => {
    const { ref } = router.query;

    if (typeof ref === "string") {
      // Delegate to our API route which sets the cookie then redirects
      router.replace(`/api/signup?ref=${encodeURIComponent(ref)}`);
    } else {
      // No referral code → go straight to NextAuth sign-in
      router.replace("/api/auth/signin");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Redirecting to sign in…</p>
    </div>
  );
}
