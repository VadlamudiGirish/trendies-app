import { useRouter } from "next/router";
import useSWR from "swr";
import { signOut } from "next-auth/react";
import { Button } from "@mantine/core";
import { CopyInput } from "@/components/ui/CopyInput";

// Types for successful data and API error
type DashboardData = {
  link: string;
  referredCount: number;
};

type ApiError = {
  error: string;
};

export default function Dashboard() {
  const router = useRouter();
  // Allow data to be DashboardData or ApiError
  const { data, error } = useSWR<DashboardData | ApiError>("/api/dashboard");

  // 1) Initial loading
  if (!data && !error) {
    return <p>Loading dashboard…</p>;
  }
  // 2) Unauthorized case from API JSON
  if (data && "error" in data && data.error === "Unauthorized") {
    router.replace("/auth/signin");
    return null;
  }
  // 3) Other fetch errors (network, etc)
  if (error) {
    return <p>Failed to load dashboard data.</p>;
  }
  // 4) At this point, data is DashboardData
  const { link, referredCount } = data as DashboardData;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-between">
        Dashboard
        <Button variant="outline" size="sm" onClick={() => void signOut()}>
          Sign Out
        </Button>
      </h1>

      <CopyInput label="Your unique referral link:" value={link} />

      <p className="mt-4 text-gray-700">
        You’ve referred <strong>{referredCount}</strong>{" "}
        {referredCount === 1 ? "friend" : "friends"} so far!
      </p>
    </div>
  );
}
