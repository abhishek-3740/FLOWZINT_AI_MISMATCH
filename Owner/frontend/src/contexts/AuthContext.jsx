import React, { createContext, useContext, useEffect, useState } from "react";
import { getLocal, setLocal } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getLocal("authUser", null));

  useEffect(() => {
    setLocal("authUser", user);
  }, [user]);

  const login = (payload) => {
    const mock = { id: `owner-${Date.now()}`, name: payload.name || "Owner", email: payload.email || "owner@local" };
    setUser(mock);
    return mock;
  };

  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export default AuthProvider;
