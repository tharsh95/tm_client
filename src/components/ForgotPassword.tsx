import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail } from '../store/slices/loginSlice';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../api'; // Import the centralized API function
import { RootState } from '../store';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.login.email);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await sendOtp(email); // Using the centralized API function
      if (response.status === 200) {
        navigate('/otp', { state: { email: response.data.email } });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Reset Your Password
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Enter your email address and we’ll send you a link to reset your
          password.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
