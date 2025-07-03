import React from "react";

const Navbar = ({ handleTheme, theme }) => {
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
          className={`themebx text-[16px] border cursor-pointer rounded-4xl py-1.5 px-4
          
          ${
            theme === "dark"
              ? "border-[var(--darkThemeText)]"
              : "border-[var(--lightThemeText)] "
          }
          
          `}
        >
          <span onClick={handleTheme}>
            {theme === "dark" ? "Light" : "Dark"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
