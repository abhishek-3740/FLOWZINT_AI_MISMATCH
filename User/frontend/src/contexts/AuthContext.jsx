import React, { createContext, useContext, useEffect, useState } from 'react';
import { userProfile } from '../data/mockData';

const AuthContext = createContext(null);
const STORAGE_KEY = 'flowzint-user-session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [replenishToastOpen, setReplenishToastOpen] = useState(false);

  useEffect(() => {
    const savedSession = window.localStorage.getItem(STORAGE_KEY);

    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const persistUser = (nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = (credentials) => {
    const nextUser = {
      name: credentials.name?.trim() || userProfile.name,
      email: credentials.email,
      vibe: 'Morning Routine',
      initials: (credentials.name?.trim()?.[0] || userProfile.initials).toUpperCase(),
    };

    persistUser(nextUser);
    setReplenishToastOpen(true);
  };

  const signup = (credentials) => {
    const nextUser = {
      name: credentials.name?.trim() || userProfile.name,
      email: credentials.email,
      vibe: 'Night Skincare',
      initials: (credentials.name?.trim()?.[0] || userProfile.initials).toUpperCase(),
    };

    persistUser(nextUser);
    setReplenishToastOpen(true);
  };

  const logout = () => {
    persistUser(null);
    setReplenishToastOpen(false);
  };

  const dismissReplenishToast = () => setReplenishToastOpen(false);

  const acceptReplenishToast = () => {
    setReplenishToastOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        login,
        signup,
        logout,
        replenishToastOpen,
        dismissReplenishToast,
        acceptReplenishToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}