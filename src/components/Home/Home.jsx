import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/authSlice';
import { Box, Typography, Button, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f4f4f9',
    textAlign: 'center',
  },
  avatar: {
    bgcolor: '#352b66',
    width: 100,
    height: 100,
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: '#352b66',
    fontWeight: 'bold',
    marginBottom: '1rem',
    fontSize: '2rem',
  },
  profileText: {
    color: '#666',
    fontSize: '1rem',
    marginBottom: '2rem',
  },
  logoutButton: {
    backgroundColor: '#352b66',
    color: '#fff',
    padding: '0.7rem 1.5rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#392a85',
    },
  },
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear localStorage and dispatch logout action
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
  };

  return (
    <Box sx={styles.container}>
      <Avatar sx={styles.avatar}>
        <PersonIcon sx={{ fontSize: 50 }} />
      </Avatar>
      {user && (
        <>
          <Typography variant="h4" sx={styles.welcomeText}>
            Welcome, {user.firstName} {user.lastName}!
          </Typography>
          <Typography sx={styles.profileText}>
            This is your profile. Explore and enjoy your personalized dashboard.
          </Typography>
        </>
      )}
      <Button
        variant="contained"
        onClick={handleLogout}
        sx={styles.logoutButton}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Home;
