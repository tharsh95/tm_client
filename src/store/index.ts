import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './slices/registerSlice';
import loginReducer from './slices/loginSlice';
import tasksReducer from './slices/tasksSlice';
import otpReducer from './slices/otpSlice'
import passwordReducer from './slices/passwordSlice'
import feedReducer from './slices/feedSlice'
import authReducer from './slices/authSlice'
export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    tasks: tasksReducer,
    otp: otpReducer,
    password: passwordReducer,
    feed:feedReducer,
    auth:authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
