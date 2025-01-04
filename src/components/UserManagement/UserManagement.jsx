import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    "@media (max-width: 600px)": {
      padding: "1rem", 
    },
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.2,
    zIndex: -1,
  },
  button: {
    backgroundColor: '#352b66',
    padding: '1rem 2rem',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#fff',
    margin: '1rem',
    '&:hover': { backgroundColor: '#392a85' },
    "@media (max-width: 600px)": {
      padding: '0.8rem 1.5rem', 
      fontSize: '1rem', 
    },
  },
  title: {
    marginBottom: '2rem',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '2rem', 
    "@media (max-width: 600px)": {
      fontSize: '1.5rem', 
    },
  },
};

const UserManagement = () => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      {/* Background image */}
      <Box
        component="img"
        src="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnVybml0dXJlfGVufDB8MHwwfHx8MA%3D%3D"
        alt="Background"
        sx={styles.backgroundImage}
      />
      
      <Typography variant="h4" sx={styles.title}>
        User Management System
      </Typography>
      <Button sx={styles.button} onClick={() => navigate('/register')}>
        Register New User
      </Button>
      <Button sx={styles.button} onClick={() => navigate('/users')}>
        View All Users
      </Button>
    </Box>
  );
};

export default UserManagement;
