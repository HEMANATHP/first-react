import React from "react";
import Policy from "../../components/policy/policy";
import Showcase from "../../components/Showcasecard/Showcase";
import Featuredproduct from "../../components/featuredproduct/Featuredproduct";
import Dealcard from "../../components/deal/Dealcard";
import Hero from "../../components/hero/Hero";
import Footer from "../../components/footer/Footer";
import useLoginStore from "../../store/loginstore";

const Home = () => {
  const {auth} = useLoginStore()
  console.log(auth?.username)
  return (
    <>
      <Hero />
      <Policy />
      <Showcase />
      <Featuredproduct />
      <Dealcard />
      <Footer/>
      </>
  );
};

export default Home;
