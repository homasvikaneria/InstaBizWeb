'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { loginApi } from '../lib/api';

const TOKEN_KEY = 'instabizweb_admin_token';
const ADMIN_KEY = 'instabizweb_admin_user';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore stored authentication state on initial mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedAdmin = localStorage.getItem(ADMIN_KEY);

      if (storedToken && storedAdmin) {
        setToken(storedToken);
        setAdmin(JSON.parse(storedAdmin));
      }
    } catch (error) {
      console.error('Failed to restore auth state from localStorage:', error);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ADMIN_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginApi(email, password);

    if (data && data.success && data.token && data.admin) {
      setToken(data.token);
      setAdmin(data.admin);

      try {
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(ADMIN_KEY, JSON.stringify(data.admin));
      } catch (err) {
        console.error('Failed to persist auth state to localStorage:', err);
      }
    } else {
      throw new Error(data?.message || 'Login failed');
    }

    return data;
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(ADMIN_KEY);
    } catch (err) {
      console.error('Failed to clear auth state from localStorage:', err);
    }
  };

  const isAuthenticated = Boolean(token && admin);

  return (
    <AuthContext.Provider
      value={{
        token,
        admin,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
