import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, deleteUser } from '../../features/userSlice';
import { v4 as uuid } from 'uuid';
import { Button, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const token = useSelector((state) => state.auth.token);
  
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateUser({ id: editId, firstname, lastname }));
      setEditId(null);
    } else {
      dispatch(addUser({ id: uuid(), firstname, lastname }));
    }
    setFirstname('');
    setLastname('');
  };

  const handleEdit = (user) => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setEditId(user.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

//   useEffect(() => {
//     if (token !== 'haulmatic') {
//       navigate('/login');
//     }
//   }, [token, navigate]);

  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#f4f4f4' }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem', color: '#352b66', fontWeight: 'bold' }}>
        User Management
      </Typography>

      {/* Form for Adding or Updating Users */}
      <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          style={{
            padding: '0.8rem',
            marginRight: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '200px',
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          style={{
            padding: '0.8rem',
            marginRight: '1rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '200px',
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#352b66',
            padding: '1rem 2rem',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#392a85' },
          }}
        >
          {editId ? 'Update User' : 'Register User'}
        </Button>
      </Box>

      {/* View All Users Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#352b66',
          marginRight: '1rem',
          padding: '1rem 2rem',
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#392a85' },
        }}
        onClick={() => navigate('/view-all-users')}
      >
        View All Users
      </Button>

      {/* View User by ID Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#352b66',
          padding: '1rem 2rem',
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#392a85' },
        }}
        onClick={() => navigate('/view-user-by-id')}
      >
        View User by ID
      </Button>

      {/* Table displaying users */}
      <TableContainer sx={{ marginTop: '2rem' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEdit(user)}
                    sx={{
                      backgroundColor: '#352b66',
                      marginRight: '1rem',
                      padding: '0.5rem 1rem',
                      fontWeight: 'bold',
                      '&:hover': { backgroundColor: '#392a85' },
                    }}
                  >
                    Update User
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(user.id)}
                    sx={{
                      marginRight: '1rem',
                      padding: '0.5rem 1rem',
                      fontWeight: 'bold',
                      '&:hover': { backgroundColor: '#d32f2f' },
                    }}
                  >
                    Delete User
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

export default UserManagement;
