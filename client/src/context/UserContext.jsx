import { createContext, useEffect, useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let [username, setUsername] = useState("");
  let [token, setToken] = useState(null);
  let [user, setUser] = useState(null);

  let navigate = useNavigate();

  let [dbError, setDbError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) return;
    if (username.length < 3) return;

    if (username) {
      let data = {
        username,
      };

      api
        .post("/sign-in", data)
        .then((res) => {
          if (res.data.success) {
          }
          if (!res.data.success) {
            setDbError(res.data.message);
            return;
          }
          setToken(res.data.data.token);
          setDbError("");
          navigate("/dashboard");
          setUsername("");
        })
        .catch((err) => setDbError(err.message));
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) setToken(localToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    localStorage.setItem("token", token);

    const fetchUser = async () => {
      try {
        const res = await api.get("/user-details", {
          headers: {
            Authorization: token,
          },
        });
        setUser(res.data.data.username);
      } catch (err) {
        console.error("Failed to fetch user:", err.message);
      }
    };

    fetchUser();
  }, [token]);
  return (
    <UserContext.Provider
      value={{ handleSubmit, token, user, username, setUsername }}
    >
      {children}
    </UserContext.Provider>
  );
};
