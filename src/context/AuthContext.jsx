import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockUsers';

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

  const login = (email, password) => {
    // Demo login: find user by email or fallback to student
    let foundUser = mockUsers.find(u => u.email === email);
    if (!foundUser) {
      // For demo purposes, if email contains 'admin', login as admin, else student
      if (email.includes('admin')) {
        foundUser = mockUsers.find(u => u.role === 'admin');
      } else {
        foundUser = mockUsers.find(u => u.role === 'student');
      }
    }
    
    setUser(foundUser);
    localStorage.setItem('campusresolve_user', JSON.stringify(foundUser));
    return foundUser;
  };

  const loginAsRole = (role) => {
    const foundUser = mockUsers.find(u => u.role === role);
    setUser(foundUser);
    localStorage.setItem('campusresolve_user', JSON.stringify(foundUser));
    return foundUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusresolve_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginAsRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
