import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  email: string | null;
  name: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  email: localStorage.getItem('email'),
  name: localStorage.getItem('name'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    clearAuth(state) {
      state.token = null;
      state.email = null;
      state.name = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
