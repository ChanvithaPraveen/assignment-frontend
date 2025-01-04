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
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      // Save user data to local storage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(values);
      localStorage.setItem("users", JSON.stringify(users));

      // Show success toast
      toast.success("Registration successful! Redirecting to Login...", {
        position: "top-center",
        autoClose: 2000,
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        position: "relative",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        overflow: "hidden",
      }}
    >
      <ToastContainer />

      {/* Full-Screen Background Image */}
      <Box
        component="img"
        src="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnVybml0dXJlfGVufDB8MHwwfHx8MA%3D%3D"
        alt="Background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.2,
          zIndex: 1,
        }}
      />

      {/* Left Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "3rem",
          color: "#fff",
          zIndex: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Sitemark
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
          Adaptable performance
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Our product effortlessly adjusts to your needs.
        </Typography>
      </Box>

      {/* Right Section (Register Form) */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          padding: "3rem",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            padding: "2rem",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.6)",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <Avatar
              sx={{
                bgcolor: "#352b66",
                width: 56,
                height: 56,
                margin: "0 auto",
                boxShadow: "0 4px 10px rgba(37, 99, 235, 0.5)",
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold", mt: 1 }}>
              Register
            </Typography>
          </Box>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Full Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  sx={{
                    backgroundColor: "#ffffff20",
                    borderRadius: "8px",
                    input: { color: "#fff" },
                    label: { color: "#ccc" },
                  }}
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
                  sx={{
                    backgroundColor: "#ffffff20",
                    borderRadius: "8px",
                    input: { color: "#fff" },
                    label: { color: "#ccc" },
                  }}
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
                  sx={{
                    backgroundColor: "#ffffff20",
                    borderRadius: "8px",
                    input: { color: "#fff" },
                    label: { color: "#ccc" },
                  }}
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
                  sx={{
                    backgroundColor: "#ffffff20",
                    borderRadius: "8px",
                    input: { color: "#fff" },
                    label: { color: "#ccc" },
                  }}
                />
              </Grid>
            </Grid>

            <FormControlLabel
              control={<Checkbox value="terms" />}
              label={<Typography sx={{ color: "#ccc" }}>I agree to the terms and conditions</Typography>}
              sx={{ mt: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 2,
                backgroundColor: "#352b66",
                color: "#fff",
                padding: "0.7rem",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#392a85" },
              }}
            >
              Register
            </Button>

            <Divider sx={{ my: 2, backgroundColor: "#ffffff30" }}>or</Divider>
            <Typography align="center" sx={{ color: "#ccc", mt: 2 }}>
              Already have an account?{" "}
              <Link href="/login" sx={{ color: "#fff", textDecoration: "underline" }}>
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