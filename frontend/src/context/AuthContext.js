// src/context/AuthContext.js
import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : { user: null, token: '' };
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://backend-54cz.onrender.com/api/v1/auth/login', { email, password });
      console.log('Login response:', response.data); // Log the response data
      const { token, ...user } = response.data; // Destructure user and token from response
  
      // Ensure user and token are present
      if (!user || !token) {
        throw new Error('Invalid login response');
      }
  
      setAuth({ user, token });
      localStorage.setItem('auth', JSON.stringify({ token, user }));
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      throw error; // This will be caught in the component
    }
  };
  


  const register = async (userData) => {
    try {
      const response = await axios.post('https://backend-54cz.onrender.com/api/v1/auth/register', userData);
      console.log('Register response:', response.data); // Log the response data
      const { token, ...user } = response.data; // Destructure user and token from response

      // Ensure user and token are present
      if (!user || !token) {
        throw new Error('Invalid registration response');
      }

      setAuth({ user, token });
      localStorage.setItem('auth', JSON.stringify({ token, user }));
    } catch (error) {
      console.error('Register error:', error.response?.data?.message || error.message);
      throw error;
    }
  };

  const logout = () => {
    setAuth({ user: null, token: '' });
    localStorage.removeItem('auth');
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
