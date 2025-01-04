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
  },
  table: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background for the table
    padding: '1rem',
    borderRadius: '10px',
    opacity: 0.9,
  },
  button: {
    backgroundColor: '#352b66',
    color: '#fff',
    marginRight: '1rem',
    '&:hover': { backgroundColor: '#392a85' },
  },
  title: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // Store the user to be deleted
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
      setOpenDialog(false); // Close the dialog after successful deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      setOpenDialog(false); // Close the dialog in case of error as well
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setUserToDelete(null);
  };

  const openConfirmationDialog = (user) => {
    setUserToDelete(user);
    setOpenDialog(true); // Open the dialog with the user's information
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
                      onClick={() => openConfirmationDialog(user)} // Open dialog for confirmation
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
