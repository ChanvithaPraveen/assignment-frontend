import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [], // Can store an array of users
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      // Adding a new user to the list
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      // Update the user info based on id
      const { id, firstName, lastName } = action.payload;
      const user = state.users.find((u) => u.id === id);
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
      }
    },
    deleteUser: (state, action) => {
      // Delete a user by id
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
