import React from "react";
import Layout from "../components/Layout";
import License from "../components/License";
import LoginWithGoogleButton from "../components/LoginWithGoogle";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <License/>
      <LoginWithGoogleButton />
    </Layout>
  );
};

export default HomePage;
