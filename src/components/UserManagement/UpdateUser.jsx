import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Avatar, Grid, Divider } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";

const UpdateUser = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState({ firstName: "", lastName: "", username: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/users/${id}`,
        user,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      navigate("/users"); 
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

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
        padding: "1.5rem", 
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
        fontSize: "2rem", 
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
  };

  return (
    <Box sx={styles.container}>
      <Box
        component="img"
        src="https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnVybml0dXJlfGVufDB8MHwwfHx8MA%3D%3D"
        alt="Background"
        sx={styles.backgroundImage}
      />

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
              Update User
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={user.firstName}
                  onChange={handleChange}
                  sx={styles.textField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={user.lastName}
                  onChange={handleChange}
                  sx={styles.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={user.username}
                  onChange={handleChange}
                  sx={styles.textField}
                />
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateUser;
