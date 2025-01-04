import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Home from '../components/Home/Home';
import UserManagement from '../components/UserManagement/UserManagement';
import Users from '../components/UserManagement/Users';
import UpdateUser from '../components/UserManagement/UpdateUser';

const AppRoutes = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/users" element={<Users />} />
        <Route path="/update-user/:id" element={<UpdateUser />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
