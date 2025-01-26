import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RegisterState {
  name: string;
  email: string;
  password: string;
}

const initialState: RegisterState = {
  name: '',
  email: '',
  password: '',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetRegister: (state) => {
      state.name = '';
      state.email = '';
      state.password = '';
    },
  },
});

export const { setName, setEmail, setPassword, resetRegister } = registerSlice.actions;
export default registerSlice.reducer;
