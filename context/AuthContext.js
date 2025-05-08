import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    console.log('Stored Auth:', storedAuth); // Debugging line
    if (storedAuth === 'true') { // Check if the stored value is 'true'
      setIsAuthenticated(true); // Set authentication state from local storage
      console.log('User is authenticated'); // Debugging line
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Store authentication state as a string
    console.log('User logged in'); // Debugging line
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Clear authentication state from local storage
    console.log('User logged out'); // Debugging line
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};