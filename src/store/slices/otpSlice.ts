// store/slices/otpSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  otp: ['', '', '', ''],
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    resetOtp: (state) => {
      state.otp = ['', '', '', ''];
    },
  },
});

export const { setOtp, resetOtp } = otpSlice.actions;
export default otpSlice.reducer;
