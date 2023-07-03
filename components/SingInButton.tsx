import React from "react";
import { popupCenter } from "../ultil/popupUtils";
import { signIn } from "next-auth/react";

interface SignInButtonProps {
  className?: string;
  children: React.ReactNode;
}


const SignInButton: React.FC<SignInButtonProps> = ({
  className = "",
  children,
}) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        // signIn('google')
        popupCenter("/google-signin", "Sign In");
      }}
      className={`px-4 py-1 block w-full h-full text-left ${className}`}
    >
      {children}
    </button>
  );
};

export default SignInButton;
