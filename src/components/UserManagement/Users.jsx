import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const styles = {
  container: {
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  table: {
    marginTop: '2rem',
    width: '80%',
  },
  button: {
    backgroundColor: '#352b66',
    marginRight: '1rem',
    '&:hover': { backgroundColor: '#392a85' },
  },
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      if (!token) {
        navigate('/login'); // Redirect if not authenticated
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token here
          },
        });
        setUsers(response.data); // Set fetched users to state
      } catch (error) {
        console.error('Error fetching users:', error);
        navigate('/login'); // Redirect if error (e.g., token expired)
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id)); // Remove user from UI after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={{ color: '#352b66', fontWeight: 'bold' }}>
        All Users
      </Typography>
      <TableContainer sx={styles.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell> {/* Display the user _id */}
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <Button
                    sx={styles.button}
                    onClick={() => navigate(`/update-user/${user._id}`)} // Use _id for navigation
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(user._id)} // Pass _id to delete
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
  );
};

export default Users;
