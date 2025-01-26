// store/slices/loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    resetLogin: (state) => {
      state.email = '';
      state.password = '';
    },
    logout: (state) => {
      state.email = '';
      state.password = '';
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    },
  },
});

export const { setEmail, setPassword, resetLogin, logout } = loginSlice.actions;
export default loginSlice.reducer;
