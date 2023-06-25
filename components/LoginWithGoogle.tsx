import { useSession } from "next-auth/react";
import React from "react";
import { popupCenter } from "../ultil/popupUtils";

const LoginWithGoogleButton: React.FC = () => {
  const { data: session, status } = useSession();

  return session ? null : (
    <button
      onClick={() => popupCenter("/google-signin", "Sign In")}
      type="button"
      tabIndex={0}
      className="flex items-center mx-4 px-4 py-1 text-small border-2 w-56 border-white hover:bg-white hover:text-black"
    >
      <img src="/google.svg" alt="Google" width={16} height={16} />
      <span className="px-2 py-1">Login with Google</span>
    </button>
  );
};

export default LoginWithGoogleButton;
