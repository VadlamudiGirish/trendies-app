import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDashboard = router.pathname === "/dashboard";

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 h-16"
      >
        <Link href="/" className="text-2xl font-extrabold tracking-wide">
          Trendies
        </Link>

        <div className="flex items-center space-x-4">
          {session && (
            <Link
              href="/dashboard"
              className={`hidden lg:inline-block text-sm font-semibold transition-colors hover:text-blue-400 ${
                isDashboard ? "text-blue-400 border-b-2 border-blue-400" : ""
              }`}
            >
              Refer a friend
            </Link>
          )}

          {session ? (
            <button
              onClick={() => signOut()}
              className="hidden lg:inline-flex px-3 py-1 text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 rounded transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="hidden lg:inline-flex items-center space-x-2 px-3 py-1 text-sm font-semibold text-white bg-[#24292F] hover:bg-[#333] rounded transition"
            >
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.074.547-.174.547-.386c0-.19-.007-.693-.01-1.36c-2.226.483-2.695-1.073-2.695-1.073c-.364-.923-.89-1.168-.89-1.168c-.727-.497.055-.487.055-.487c.803.056 1.226.825 1.226.825c.714 1.223 1.873.87 2.33.666c.072-.517.28-.87.508-1.07c-1.777-.202-3.644-.888-3.644-3.953c0-.873.312-1.588.824-2.148c-.083-.203-.357-1.017.078-2.12c0 0 .672-.215 2.2.82a7.688 7.688 0 012.005-.27c.68.003 1.366.092 2.005.27c1.526-1.035 2.197-.82 2.197-.82c.437 1.103.163 1.917.08 2.12c.513.56.823 1.275.823 2.148c0 3.073-1.868 3.748-3.648 3.947c.289.25.543.737.543 1.486c0 1.073-.01 1.937-.01 2.2c0 .214.144.463.55.384A8.001 8.001 0 0016 8c0-4.418-3.582-8-8-8z"
                />
              </svg>
              <span>Login with GitHub</span>
            </button>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex lg:hidden items-center justify-center rounded p-2 text-gray-300 hover:text-white focus:outline-none"
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 bg-gray-800/75 z-40" />
        <DialogPanel className="fixed inset-y-0 left-0 z-50 w-full bg-gray-900 p-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold">
              Trendies
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-300 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {session && (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded px-3 py-2 text-base font-semibold transition ${
                  isDashboard
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Refer a friend
              </Link>
            )}
            {session ? (
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="block w-full rounded px-3 py-2 text-base font-semibold text-gray-300 text-left hover:bg-gray-800 hover:text-white"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  signIn("github", { callbackUrl: "/" });
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center space-x-2 rounded px-3 py-2 text-base font-semibold text-white bg-[#24292F] hover:bg-[#333]"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.074.547-.174.547-.386c0-.19-.007-.693-.01-1.36c-2.226.483-2.695-1.073-2.695-1.073c-.364-.923-.89-1.168-.89-1.168c-.727-.497.055-.487.055-.487c.803.056 1.226.825 1.226.825c.714 1.223 1.873.87 2.33.666c.072-.517.28-.87.508-1.07c-1.777-.202-3.644-.888-3.644-3.953c0-.873.312-1.588.824-2.148c-.083-.203-.357-1.017.078-2.12c0 0 .672-.215 2.2.82a7.688 7.688 0 012.005-.27c.68.003 1.366.092 2.005.27c1.526-1.035 2.197-.82 2.197-.82c.437 1.103.163 1.917.08 2.12c.513.56.823 1.275.823 2.148c0 3.073-1.868 3.748-3.648 3.947c.289.25.543.737.543 1.486c0 1.073-.01 1.937-.01 2.2c0 .214.144.463.55.384A8.001 8.001 0 0016 8c0-4.418-3.582-8-8-8z"
                  />
                </svg>
                <span>Login with GitHub</span>
              </button>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
