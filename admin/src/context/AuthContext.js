import { createContext, useContext, useEffect, useState } from "react";
import adminApi from "../services/adminApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await adminApi.post("/admin/login", { email, password });
    localStorage.setItem("adminToken", res.data.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
