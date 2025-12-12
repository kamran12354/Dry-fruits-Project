import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Try to fetch profile from backend. Add /auth/profile on backend if not present.
  const fetchProfile = async () => {
    try {
      const res = await api.get("/auth/profile"); // backend: implement if missing
      setUser(res.data.user || null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      setUser(res.data);
      return res.data;
    } catch (error) {
      // Re-throw the error so Login.jsx can handle it
      throw error;
    }
  };

  const signup = async (payload) => {
    const res = await api.post("/auth/signup", payload);
    // Do not auto-set the user on signup. After signup the user should log in.
    return res.data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout, fetchProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
