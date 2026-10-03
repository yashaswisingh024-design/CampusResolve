import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for saved session
    const savedUser = localStorage.getItem('campusresolve_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authApi.login(email, password);
    setUser(data);
    localStorage.setItem('campusresolve_user', JSON.stringify(data));
    return data;
  };

  const googleLogin = async (credential) => {
    const data = await authApi.googleLogin(credential);
    setUser(data);
    localStorage.setItem('campusresolve_user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusresolve_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
