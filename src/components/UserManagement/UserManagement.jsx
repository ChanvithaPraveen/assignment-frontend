import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const styles = {
  container: {
    // padding: '2rem',
    backgroundColor: '#f4f4f4',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#352b66',
    padding: '1rem 2rem',
    fontWeight: 'bold',
    fontSize: '1.2rem',
    margin: '1rem',
    '&:hover': { backgroundColor: '#392a85' },
  },
};

const UserManagement = () => {
  const navigate = useNavigate();

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={{ marginBottom: '2rem', color: '#352b66', fontWeight: 'bold' }}>
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
