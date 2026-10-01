import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('adhhesi_admin_auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAdmin(parsed);
      } catch (e) {
        localStorage.removeItem('adhhesi_admin_auth');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      if (res.data.success && res.data.data) {
        setAdmin(res.data.data);
        localStorage.setItem('adhhesi_admin_auth', JSON.stringify(res.data.data));
        return { success: true };
      }
      return { success: false, message: 'Invalid response from server' };
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Please check credentials.';
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('adhhesi_admin_auth');
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
