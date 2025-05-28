import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  const isDashboard = router.pathname === "/dashboard";

  // Load OAuth providers
  useEffect(() => {
    getProviders().then((prov) => setProviders(prov));
  }, []);

  // Helper to pick icon by provider ID
  const renderProviderIcon = (id: string) => {
    switch (id) {
      case "github":
        return (
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38
                 0-.19-.01-.69-.01-1.36-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17
                 -.73-.5.06-.49.06-.49.8.06 1.23.82 1.23.82.71 1.22 1.87.87 2.33.66
                 .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95
                 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
                 0 0 .67-.22 2.2.82a7.7 7.7 0 012.01-.27c.68 0 1.36.09 2.01.27
                 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
                 .51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95
                 .29.25.55.73.55 1.48 0 1.07-.01 1.94-.01 2.2
                 0 .21.15.46.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
        );
      case "google":
        return (
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M21.35 11.1h-9.35v2.8h5.4c-.23 1.45-1.29 2.66-2.75 3.1v2.6h4.45
                     c2.6-2.4 4.1-6 4.1-9.9 0-.7-.06-1.4-.2-2z"
              fill="#4285F4"
            />
            <path
              d="M12 22c2.7 0 4.96-.9 6.65-2.45l-4.45-2.6
                     c-1.23.82-2.8 1.3-4.2 1.3-3.2 0-5.9-2.15-6.85-5.05H.6v2.6
                     C2.3 19.8 7.7 22 12 22z"
              fill="#34A853"
            />
            <path
              d="M5.15 13.2a7.42 7.42 0 010-4.4V6.2H.6
                     a11.9 11.9 0 000 8.8z"
              fill="#FBBC05"
            />
            <path
              d="M12 4.2c1.85 0 3.5.64 4.8 1.9l3.6-3.6
                     C16.95.85 14.7 0 12 0 7.7 0 2.3 2.2.6 6.2l4.55 2.6
                     C6.1 6.35 8.8 4.2 12 4.2z"
              fill="#EA4335"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 h-16">
        <Link href="/" className="text-2xl font-extrabold tracking-wide">
          Trendies
        </Link>

        <div className="flex items-center space-x-4">
          {session && (
            <Link
              href="/dashboard"
              className={`hidden lg:inline-block text-sm font-semibold transition hover:text-blue-400 ${
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
            providers &&
            Object.values(providers).map((prov) => (
              <button
                key={prov.id}
                onClick={() => signIn(prov.id, { callbackUrl: "/" })}
                className="hidden lg:inline-flex items-center space-x-2 px-3 py-1 text-sm font-semibold rounded transition bg-white text-gray-800 hover:bg-gray-100"
              >
                {renderProviderIcon(prov.id)}
                <span>Sign in with {prov.name}</span>
              </button>
            ))
          )}

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex lg:hidden items-center justify-center rounded p-2 text-gray-300 hover:text-white"
          >
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </nav>

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
              className="p-2 text-gray-300 hover:text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" />
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
                className="block w-full rounded px-3 py-2 text-base font-semibold text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Logout
              </button>
            ) : (
              providers &&
              Object.values(providers).map((prov) => (
                <button
                  key={prov.id}
                  onClick={() => {
                    signIn(prov.id, { callbackUrl: "/" });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 rounded px-3 py-2 text-base font-semibold bg-white text-gray-800 hover:bg-gray-100"
                >
                  {renderProviderIcon(prov.id)}
                  <span>Sign in with {prov.name}</span>
                </button>
              ))
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
