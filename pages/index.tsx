import React from "react";
import Layout from "../components/Layout";
import Home from "../components/Home";
import LoginWithGoogleButton from "../components/LoginWithGoogle";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Home/>
      <LoginWithGoogleButton />
    </Layout>
  );
};

export default HomePage;
