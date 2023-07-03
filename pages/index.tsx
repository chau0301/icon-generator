import React from "react";
import Layout from "../components/Layout";
import Home from "../components/Home";
import LoginWithGoogleButton from "../components/LoginWithGoogle";
import Generate from "../components/Generate";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Generate />
      {/* <LoginWithGoogleButton /> */}
    </Layout>
  );
};

export default HomePage;
