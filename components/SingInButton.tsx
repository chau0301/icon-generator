import React from "react";
import { popupCenter } from "../ultil/popupUtils";

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
      onClick={() => {
        popupCenter("/google-signin", "Sign In");
      }}
      className={`px-4 py-1 block w-full h-full text-left ${className}`}
    >
      {children}
    </button>
  );
};

export default SignInButton;
