import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../features/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Avatar,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
  leftSection: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '3rem',
    color: '#fff',
    zIndex: 2,
  },
  rightSection: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
    zIndex: 2,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: '2rem',
    borderRadius: '16px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
  },
  avatar: {
    bgcolor: '#352b66',
    width: 56,
    height: 56,
    margin: '0 auto',
    boxShadow: '0 4px 10px rgba(37, 99, 235, 0.5)',
  },
  formTitle: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
  textField: {
    backgroundColor: '#ffffff20',
    borderRadius: '8px',
    input: { color: '#fff' },
    label: { color: '#ccc' },
  },
  submitButton: {
    mt: 2,
    backgroundColor: '#352b66',
    color: '#fff',
    padding: '0.7rem',
    fontWeight: 'bold',
    '&:hover': { backgroundColor: '#392a85' },
  },
  divider: {
    my: 2,
    backgroundColor: '#ffffff30',
  },
  link: {
    color: '#ccc',
    fontSize: '0.875rem',
    cursor: 'pointer',
  },
  text: {
    fontWeight: 'bold',
    mb: 1,
  },
  imageContainer: {
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
      toast.success('Login successful!');
      navigate('/home');
    },
  });

  return (
    <Box sx={styles.container}>
      <Box component="img" src="https://via.placeholder.com/1920x1080" alt="Background" sx={styles.backgroundImage} />
      
      <Box sx={styles.leftSection}>
        <Box>
          <Typography variant="h4" sx={styles.text}>User Management System</Typography>
          <Typography variant="h6" sx={styles.text}>Enterprise Level Experience</Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>Fulfill handling all User CRUDs.</Typography>
        </Box>
      </Box>

      <Box sx={styles.rightSection}>
        <Box sx={styles.formContainer}>
          <Box sx={styles.imageContainer}>
            <Avatar sx={styles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" sx={styles.formTitle}>Sign in</Typography>
          </Box>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              margin="normal"
              sx={styles.textField}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              sx={styles.textField}
            />
            <Button fullWidth variant="contained" type="submit" sx={styles.submitButton}>Sign in</Button>

            <Divider sx={styles.divider}>or</Divider>
            {/* Optional Social login buttons */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
