import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) return null;

  // Build the full referral link
  const link = `${process.env.NEXTAUTH_URL}/signup?ref=${
    session.user!.referralCode
  }`;

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {session.user.name ?? "User"}!
      </h1>
      <p className="mb-2">Your unique referral link:</p>
      <div className="flex mb-4">
        <input
          type="text"
          readOnly
          value={link}
          className="flex-grow border rounded-l px-4 py-2"
        />
        <button
          onClick={() => navigator.clipboard.writeText(link)}
          className="bg-blue-600 text-white px-4 py-2 rounded-r"
        >
          Copy
        </button>
      </div>
      <p className="text-gray-700">
        You’ve referred <strong>{session.user.referredCount}</strong>{" "}
        {session.user.referredCount === 1 ? "friend" : "friends"}!
      </p>
    </div>
  );
}

// Server-side redirect if not authenticated
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
