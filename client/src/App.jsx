import React, { useEffect, useState } from "react";
import Signin from "./auth/Signin";
import Navbar from "./pages/Navbar";

const App = () => {
  let [theme, setTheme] = useState("dark");

  const handleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <div className="relative">
      <Navbar handleTheme={handleTheme} theme={theme} />
      <Signin theme={theme} />
    </div>
  );
};

export default App;
