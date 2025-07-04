import { createContext, useEffect, useState } from "react";
import api from "../services/api.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let [token, setToken] = useState(null);

  const handleSubmit = (e, username) => {
    e.preventDefault();

    if (!username) return;
    if (username.length < 3) return;

    if (username) {
      let data = {
        username,
      };

      api
        .post("/sign-in", data)
        .then((res) => setToken(res.data.data.token))
        .catch((err) => console.log(err.message));
    }
    setUsername("");
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else if (!token) {
      let localToken = localStorage.getItem("token");

      setToken(localToken);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ handleSubmit, token }}>
      {children}
    </UserContext.Provider>
  );
};
