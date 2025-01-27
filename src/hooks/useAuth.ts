/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios from 'axios';

interface ApiResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

export const useAuthApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (name: string, email: string, password: string): Promise<ApiResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      setIsLoading(false);
      return { success: true, message: 'Registration successful', data: response.data };
    } catch (err: any) {
      setIsLoading(false);
      console.log(err,'err')
      setError(err.response?.data.message || 'An error occurred');
      return { success: false, message: err.response?.data.message || 'An error occurred' };
    }
  };

  const login = async (email: string, password: string): Promise<ApiResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BE_URL}/auth/login`, {
        email,
        password,
      });
      setIsLoading(false);
      return { success: true, message: 'Login successful', data: response.data };
    } catch (err: any) {
      setIsLoading(false);
      console.log(err,"qwe")
      setError(err.response?.data.message || 'An error occurred');
      return { success: false, message: err.response?.data?.message || 'An error occurred', data: undefined };
    }
  };

  return { isLoading, error, register, login };
};
