import React from "react";
import Layout from "../components/Layout";
import Generate from "../components/Generate";
import LoginWithGoogleButton from "../components/LoginWithGoogle";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Generate/>
      <LoginWithGoogleButton />
    </Layout>
  );
};

export default HomePage;
