import React from "react";
import Layout from "../components/Layout";
import PricingComponent from "../components/Pricing";
import LoginWithGoogleButton from "../components/LoginWithGoogle";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <PricingComponent/>  
      <LoginWithGoogleButton />
    </Layout>
  );
};

export default HomePage;
