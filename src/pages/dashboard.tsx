import { useRouter } from "next/router";
import useSWR from "swr";
import { motion } from "framer-motion";
import { CopyInput } from "@/components/CopyInput";

type DashboardData = { link: string; referredCount: number };
type ApiError = { error: string };

export default function Dashboard() {
  const router = useRouter();
  const { data, error } = useSWR<DashboardData | ApiError>("/api/dashboard");

  // loading
  if (!data && !error)
    return (
      <p className="flex-1 flex items-center justify-center text-white">
        Loading dashboard…
      </p>
    );
  // unauthorized
  if (data && "error" in data && data.error === "Unauthorized") {
    router.replace("/");
    return null;
  }
  // error
  if (error)
    return (
      <p className="flex-1 flex items-center justify-center text-red-500">
        Failed to load data.
      </p>
    );

  const { link, referredCount } = data as DashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-900 text-white flex flex-col">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex flex-col items-center justify-center p-6"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 drop-shadow-lg mb-8 uppercase"
        >
          Refer a friend
        </motion.h1>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
          className="w-full max-w-md"
        >
          <CopyInput label="Referral link:" value={link} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-2xl font-semibold"
        >
          You’ve referred <span className="text-blue-400">{referredCount}</span>{" "}
          {referredCount === 1 ? "friend" : "friends"} so far!
        </motion.p>
      </motion.main>
    </div>
  );
}
