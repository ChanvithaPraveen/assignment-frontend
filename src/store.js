import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // Using localStorage to persist the state
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';

// Persist config for auth state
const persistConfig = {
  key: 'auth',  // Key for persisted reducer
  storage,  // Using localStorage for persistence
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,  // Auth state will be persisted
    users: userReducer,  // Users are not persisted
  },
});

export const persistor = persistStore(store);
