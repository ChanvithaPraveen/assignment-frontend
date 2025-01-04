import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [], 
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { id, firstName, lastName } = action.payload;
      const user = state.users.find((u) => u.id === id);
      if (user) {
        user.firstName = firstName;
        user.lastName = lastName;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
