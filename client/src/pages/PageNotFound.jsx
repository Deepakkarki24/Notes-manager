import React, { useContext } from "react";
import { Link } from "react-router";
import Navbar from "./Navbar";
import { ThemeContext } from "../context/ThemeContext";

const PageNotFound = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="relative">
      <Navbar />
      <div
        className={`min-h-screen px-4 flex flex-col items-center justify-center
        
        ${
          theme === "dark"
            ? "bg-[var(--darkThemeBg)] text-[var(--darkThemeText)]"
            : "bg-[var(--lightThemeBg)] text-[var(--lightThemeText)]"
        }
        `}
      >
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-6">Oops! Page not found.</p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
