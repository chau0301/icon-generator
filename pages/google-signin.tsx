import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import Layout from "../components/Layout";

const SignInPage: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!(status === "loading") && !session) void signIn("google");
    if (session) window.close();
    if (session) {
      console.log("Name:", session.user.name);
      console.log("Email:", session.user.email);
    }
  }, [session, status]);

  return null;
};

export default SignInPage;
