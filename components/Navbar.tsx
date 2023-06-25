import React from "react";
import { useRouter } from "next/router";
import { signOut, useSession, signIn } from "next-auth/react";
import SignInButton from "./SingInButton";
import Link from "next/link";

const Navbar = ({ navbarOpen }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <nav
      className={`${
        navbarOpen ? "bg-white w-64 flex flex-col" : "hidden"
      } fixed top-0 left-0 bottom-0 overflow-y-auto mt-12`}
    >
      <ul className="flex flex-col pt-4">
        <li className="font-bold hover:bg-gray-300 hover:text-black hover:cursor-pointer">
          <Link href="/generate" className="px-4 py-1 block w-full h-full">
            Generate
          </Link>
        </li>
        <li className="font-bold hover:bg-gray-300 hover:text-black hover:cursor-pointer">
          <Link href="/history" className="px-4 py-1 block w-full h-full">
            History
          </Link>
        </li>
        <li className="font-bold hover:bg-gray-300 hover:text-black hover:cursor-pointer">
          <Link href="/license" className="px-4 py-1 block w-full h-full">
            License
          </Link>
        </li>
        <li className="font-bold hover:bg-gray-300 hover:text-black hover:cursor-pointer">
          <Link href="/pricing" className="px-4 py-1 block w-full h-full">
            💎 Get Tokens
          </Link>
        </li>
        {session ? (
          <li className="font-bold hover:bg-gray-300 hover:text-black hover:cursor-pointer">
            <button
              onClick={() => signOut()}
              className="px-4 py-1 block w-full h-full justify-self-start text-left"
            >
              Logout
            </button>
          </li>
        ) : (
          <li className="font-bold hover:bg-gray-300 hover:text-black hover:cursor-pointer block w-full h-full">
            <SignInButton
              className="px-4 py-1 block w-full h-full"
            >
              Login
            </SignInButton>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
