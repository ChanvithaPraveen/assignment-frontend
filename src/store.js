import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';

const persistConfig = {
  key: 'auth',  
  storage,  
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,  
    users: userReducer,  
  },
});

export const persistor = persistStore(store);
