import React, { ReactNode, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Home from "./Home";
import SignInButton from "./SingInButton";
import LoginWithGoogleButton from "./LoginWithGoogle";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <div className="bg-gray-300 overflow-hidden block">
      <Header toggleNavbar={toggleNavbar} />
      <div
        className={`${
          navbarOpen ? "ml-64 " : ""
        }flex flex-col bg-black text-white p-12 mt-12 min-h-[calc(100vh-3rem)] overflow-hidden`}
      >
        {props.children}
      </div>
      <Navbar navbarOpen={navbarOpen} />
    </div>
  );
};

export default Layout;
