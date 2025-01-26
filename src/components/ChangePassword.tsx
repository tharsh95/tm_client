import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setPassword, setConfirmPassword, setError } from '../store/slices/passwordSlice';
import { changePassword } from '../api'; // Import the centralized API function
import { RootState } from '../store';

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;

  // Access form state from Redux store
  const { password, confirmPassword, error } = useSelector((state: RootState) => state.password);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch(setError('Passwords do not match.'));
      return;
    }

    try {
      const response = await changePassword(email, password); // Using the centralized API function

      if (response.status === 200) {
        dispatch(setError('')); // Reset error
        navigate(location.pathname, { replace: true });
        navigate('/login', { state: { message: 'Password changed successfully' } });
      }
    } catch {
      dispatch(setError('An error occurred while changing the password.'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Change Your Password
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your new password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Re-enter your new password"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
