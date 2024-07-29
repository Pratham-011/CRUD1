import React from 'react';
import AdminDashboard from '../components/AdminDashboard';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboardPage = () => {
  const { auth } = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  if (auth.user.role !== 1) {
    return <Navigate to="/" />;
  }

  return <AdminDashboard />;
};

export default AdminDashboardPage;
