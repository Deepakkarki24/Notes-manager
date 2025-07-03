import React, { useState } from "react";

const Signin = ({ theme }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username submitted:", username);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center 
        ${
          theme === "dark"
            ? "bg-[var(--darkThemeBg)] text-[var(--darkThemeText)]"
            : "bg-[var(--lightThemeBg)] text-[var(--lightThemeText)]"
        }
        `}
    >
      <form
        onSubmit={handleSubmit}
        className=" border p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring focus:border-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
