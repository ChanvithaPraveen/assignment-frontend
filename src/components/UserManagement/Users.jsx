import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    position: 'relative',
    "@media (max-width: 600px)": {
      padding: '1rem',
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
    zIndex: 1,
  },
  tableWrapper: {
    zIndex: 2,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    "@media (max-width: 600px)": {
      paddingTop: '2rem',
      paddingBottom: '2rem',
    },
  },
  table: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '1rem',
    borderRadius: '10px',
    opacity: 0.9,
    "@media (max-width: 600px)": {
      width: '100%', // Make table take full width on small screens
    },
  },
  button: {
    backgroundColor: '#352b66',
    color: '#fff',
    marginRight: '1rem',
    '&:hover': { backgroundColor: '#392a85' },
    "@media (max-width: 600px)": {
      padding: '0.5rem 1rem', // Adjust button size for mobile
      fontSize: '0.9rem', // Adjust font size for mobile
    },
  },
  title: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
    marginBottom: '1rem',
    fontSize: '2rem', // Larger font size for desktop
    "@media (max-width: 600px)": {
      fontSize: '1.5rem', // Smaller font size for mobile
    },
  },
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        navigate('/login');
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/users/${userToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== userToDelete._id));
      setOpenDialog(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      setOpenDialog(false);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setUserToDelete(null);
  };

  const openConfirmationDialog = (user) => {
    setUserToDelete(user);
    setOpenDialog(true);
  };

  return (
    <Box sx={styles.container}>
      <Box
        component="img"
        src="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnVybml0dXJlfGVufDB8MHwwfHx8MA%3D%3D"
        alt="Background"
        sx={styles.backgroundImage}
      />
      <Box sx={styles.tableWrapper}>
        <Typography variant="h4" sx={styles.title}>
          All Users
        </Typography>
        <TableContainer sx={styles.table}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>User ID</b></TableCell>
                <TableCell><b>First Name</b></TableCell>
                <TableCell><b>Last Name</b></TableCell>
                <TableCell><b>UserName</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Button
                      sx={styles.button}
                      onClick={() => navigate(`/update-user/${user._id}`)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => openConfirmationDialog(user)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
