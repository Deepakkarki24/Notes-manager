import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { handleTheme, theme } = useContext(ThemeContext);

  return (
    <nav
      className={`navbar flex justify-between py-4 px-6
        ${
          theme === "dark"
            ? "bg-[var(--darkThemeBg)] text-[var(--darkThemeText)]] border-b border-b-gray-600"
            : "bg-[var(--lightThemeBg)] text-[var(--lightThemeText)] border-b border-b-gray-400"
        }
        
         `}
    >
      <div className="left">
        <div className="logo text-2xl cursor-pointer">
          <span>Notes Manager</span>
        </div>
      </div>
      <div className="right">
        <div
          onClick={handleTheme}
          className={`themebx text-[16px] border cursor-pointer rounded-4xl py-1.5 px-4
          
          ${
            theme === "dark"
              ? "border-[var(--darkThemeText)]"
              : "border-[var(--lightThemeText)] "
          }
          
          `}
        >
          <span>{theme === "dark" ? "Light" : "Dark"}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
