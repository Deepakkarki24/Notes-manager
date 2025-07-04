import React from "react";
import Navbar from "./Navbar";
import Signin from "../auth/Signin";

const HomePage = () => {
  return (
    <div className="relative">
      <Navbar />
      <Signin />
    </div>
  );
};

export default HomePage;
