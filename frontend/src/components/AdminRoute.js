import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ element, ...rest }) => {
  const { auth } = useAuth();
  return (
    <Route
      {...rest}
      element={auth.user && auth.user.role === 1 ? element : <Navigate to="/" />}
    />
  );
};

export default AdminRoute;
