import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const SignInPage: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!(status === "loading") && !session) void signIn("google");
    if (session) window.close();
  }, [session, status]);

  return null;
};

export default SignInPage;
