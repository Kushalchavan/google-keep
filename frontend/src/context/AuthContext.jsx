import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // login: expects backend to return {token, user?}
  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    const { token, user: returnedUser } = res.data;
    if (!token) throw new Error("No token returned from server");
    localStorage.setItem("token", token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    if (returnedUser) {
      setUser(returnedUser);
    } else {
      const profile = await API.get("/auth/user");
      setUser(profile.data);
    }
  };

  const signup = async (firstname, lastname, email, password) => {
    const res = await API.post("/auth/signup", {
      firstname,
      lastname,
      email,
      password,
    });

    const { token, user: returnedUser } = res.data;
    localStorage.setItem("token", token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(returnedUser || null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
    setUser(null);
  };

  // initiallize auth on app load
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const { data } = await API.get("auth/user");
        setUser(data);
      } catch (error) {
        console.warn("Token invalid or profile fetch failed", error.message);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
