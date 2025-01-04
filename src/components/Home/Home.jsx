import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    navigate('/');
  }

  return (
    <Box sx={styles.container}>
      <Avatar sx={styles.avatar}>
        <PersonIcon sx={{ fontSize: 50 }} />
      </Avatar>
      <Typography variant="h4" sx={styles.welcomeText}>
        Welcome, {user?.firstname} {user?.lastname}!
      </Typography>
      <Typography sx={styles.profileText}>
        This is your profile. Explore and enjoy your personalized dashboard.
      </Typography>
      <Button
        variant="contained"
        onClick={() => dispatch(logout())}
        sx={styles.logoutButton}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Home;
