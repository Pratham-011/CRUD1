import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';

const Navbar = () => {
  const { auth, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          MyApp
        </Typography>
        <div style={{ flexGrow: 1 }} />
        <Button color="inherit" component={Link} to="/">Home</Button>
        {auth.user ? (
          <>
            {auth.user.role === 1 && <Button color="inherit" component={Link} to="/admin-dashboard">Admin Dashboard</Button>}
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
