import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,  // Load token from localStorage if available
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // On successful login, store the token in the state
      const { token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;

      // Store token in localStorage
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      // Clear token and authentication state
      state.token = null;
      state.isAuthenticated = false;

      // Remove token from localStorage
      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
