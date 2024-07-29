// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth.user || auth.user.role !== 1) {
    // Redirect to home if not authenticated or not an admin
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
