// store/slices/passwordSlice.js
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasswordState {
  password: string;
  confirmPassword: string;
  error: string;
}

const initialState: PasswordState = {
  password: '',
  confirmPassword: '',
  error: '',
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setPassword, setConfirmPassword, setError } = passwordSlice.actions;
export default passwordSlice.reducer;
