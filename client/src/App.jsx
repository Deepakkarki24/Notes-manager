import React, { useEffect, useState } from "react";
import Signin from "./auth/Signin";
import Navbar from "./pages/Navbar";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";

const App = () => {
  let [theme, setTheme] = useState("dark");

  const handleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/" element={<HomePage/>}/> */}
    </Routes>
  );
};

export default App;
