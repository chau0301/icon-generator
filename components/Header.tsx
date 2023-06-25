import React from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import SignInButton from "./SingInButton";
import Link from "next/link";
const Header = ({ toggleNavbar }) => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  return (
    <header className="bg-black fixed top-0 left-0 w-full h-12 border-b border-gray-700 z-50">
      <div className="flex">
        <div className="flex items-center h-full pr-4 menu-logo">
          <button
            className="text-white focus:outline-none hover:text-white hover:bg-zinc-700 p-3"
            onClick={toggleNavbar}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>
          <Link
            href="/"
            className="text-white text-sm font-medium flex items-center ml-3 cursor-default"
          >
            <img src="/logo.svg" alt="Logo" className="w-6 mr-2" />
            <span>IconGenerator</span>
          </Link>
        </div>
        <nav id="navbar" className="flex-grow relative navbar">
          <ul className="flex h-full whitespace-no-wrap">
            <li className="flex items-center justify-center h-full hover:bg-zinc-700 ml-3">
              <Link
                href="/generate"
                className="text-gray-400 px-4 text-center font-small hover:text-white h-full flex items-center justify-center"
              >
                Generate
              </Link>
            </li>
            <li className="flex items-center justify-center h-full hover:bg-zinc-700">
              <Link
                href="/history"
                className="text-gray-400 px-4 text-center font-small hover:text-white h-full flex items-center justify-center"
              >
                History
              </Link>
            </li>
            <li className="flex items-center justify-center h-full hover:bg-zinc-700">
              <Link
                href="/pricing"
                className="text-gray-400 px-4 text-center font-small hover:text-white h-full flex items-center justify-center"
              >
                💎 Buy Tokens
              </Link>
            </li>
            {session ? (
              // If the user is logged in, show the logout button
              <li className="flex items-center justify-center h-full hover:bg-zinc-700">
                <button
                  onClick={() => signOut()}
                  className="hidden text-gray-400 px-4 text-center font-small hover:text-white h-full items-center justify-center"
                >
                  Logout
                </button>
              </li>
            ) : (
              // If the user is not logged in, show the login button
              <li className="flex items-center justify-center h-full hover:bg-zinc-700 text-gray-400text-center font-small hover:text-white">
                <SignInButton
                  className="text-gray-400 text-center font-small hover:text-white h-full flex items-center justify-center"
                >
                  Login
                </SignInButton>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
