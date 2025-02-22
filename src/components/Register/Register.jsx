import React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    position: "relative",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    overflow: "hidden",
    flexDirection: "column", 
    "@media (min-width: 600px)": {
      flexDirection: "row", 
    },
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.2,
    zIndex: 1,
  },
  leftSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "3rem",
    color: "#fff",
    zIndex: 2,
    textAlign: "center", 
    "@media (min-width: 600px)": {
      textAlign: "left", 
    },
  },
  rightSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "3rem",
    zIndex: 2,
    "@media (max-width: 500px)": {
      padding: "1.5rem", 
    },
  },
  formContainer: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: "2rem",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
    "@media (max-width: 600px)": {
      padding: "1rem", 
    },
  },
  avatar: {
    bgcolor: "#352b66",
    width: 56,
    height: 56,
    margin: "0 auto",
    boxShadow: "0 4px 10px rgba(37, 99, 235, 0.5)",
  },
  formTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: "1rem",
    fontSize: "1.5rem", 
    "@media (min-width: 600px)": {
      fontSize: "1.5rem", 
    },
  },
  textField: {
    backgroundColor: "#ffffff20",
    borderRadius: "8px",
    input: { color: "#fff" },
    label: { color: "#ccc" },
  },
  submitButton: {
    mt: 2,
    backgroundColor: "#352b66",
    color: "#fff",
    padding: "0.7rem",
    fontWeight: "bold",
    "&:hover": { backgroundColor: "#392a85" },
    "@media (max-width: 600px)": {
      padding: "0.5rem", 
    },
  },
  divider: {
    my: 2,
    backgroundColor: "#ffffff30",
  },
  link: {
    color: "#fff",
    textDecoration: "underline",
  },
  termsLabel: {
    color: "#ccc",
  },
};

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(3, "First Name must be at least 3 characters").required("First Name is required"),
      lastName: Yup.string().min(3, "Last Name must be at least 3 characters").required("Last Name is required"),
      username: Yup.string().min(3, "Username must be at least 3 characters").required("Username is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:5000/api/users/register", values);
        toast.success("Registration successful! Redirecting to Login...", { position: "top-center", autoClose: 2000 });
        setTimeout(() => navigate("/login"), 2000);
      } catch {
        toast.error("Registration failed. Please try again.", { position: "top-center", autoClose: 2000 });
      }
    },
  });

  return (
    <Box sx={styles.container}>
      <ToastContainer />
      <Box component="img" src="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?w=500&auto=format&fit=crop&q=60" alt="Background" sx={styles.backgroundImage} />
      <Box sx={styles.leftSection}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Haulmatics
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Adaptable performance
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Our product effortlessly adjusts to your needs.
        </Typography>
      </Box>
      <Box sx={styles.rightSection}>
        <Box sx={styles.formContainer}>
          <Box sx={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <Avatar sx={styles.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" sx={styles.formTitle}>
              Register
            </Typography>
          </Box>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  sx={styles.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  sx={styles.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  sx={styles.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  sx={styles.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  sx={styles.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  sx={styles.textField}
                />
              </Grid>
            </Grid>
            <FormControlLabel
              control={<Checkbox value="terms" />}
              label={<Typography sx={styles.termsLabel}>I agree to the terms and conditions</Typography>}
              sx={{ mt: 2 }}
            />
            <Button fullWidth variant="contained" type="submit" sx={styles.submitButton}>
              Register
            </Button>
            <Divider sx={styles.divider}>or</Divider>
            <Typography align="center" sx={{ color: "#ccc", mt: 2 }}>
              Already have an account?{" "}
              <Link href="/login" sx={styles.link}>
                Login
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
