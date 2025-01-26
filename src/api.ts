import axios from 'axios';

// Base URL for API requests
const BASE_URL = import.meta.env.VITE_BE_URL;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token'),
};

// Function to create a new task
export const createTask = async (taskData: { title: string, description: string }) => {
    const response = await axios.post(`${BASE_URL}/task`, taskData, { headers });
    return response.data; // Returning the API response
};
export const getTasks = async () => {

    const response = await axios.get(`${BASE_URL}/task`, { headers });
    return response.data;
};

// Function to update task status
export const updateTaskStatus = async (taskId: string, status: string) => {
    const response = await axios.patch(`${BASE_URL}/task/${taskId}`, { status }, { headers });
    return response.data;
};

// Function to delete task
export const deleteTask = async (taskId: string) => {
    const response = await axios.delete(`${BASE_URL}/task/${taskId}`, { headers });
    return response.data;
};
// Function to verify otp
export const verifyOtp = async (email: string, otp: string) => {
    const payload = { email, otp };
    const response = await axios.post(`${BASE_URL}/auth/verifyOtp`, payload);
    return response;
};

// Function to resend OTP
export const resendOtp = async (email: string) => {
    const payload = { email };
    const response = await axios.post(`${BASE_URL}/auth/sendOtp`, payload);
    return response;
};

export const sendOtp = async (email: string) => {
    const payload = { email };
    const response = await axios.post(`${BASE_URL}/auth/sendOtp`, payload);
    return response;
};

export const changePassword = async (email: string, password: string) => {
    const payload = { email, password };
    const response = await axios.post(`${BASE_URL}/auth/resetPassword`, payload);
    return response;
};


// Function to upload image to Cloudinary
export const uploadImageToCloudinary = async (image:File) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', CLOUDINARY_PRESET);
    formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

    try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        return response.data.url;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Error uploading image to Cloudinary: ' + error.message);
        } else {
            throw new Error('Error uploading image to Cloudinary');
        }
    }
};

// Function to create a feed item
export const createFeed = async (payload:{url:string,description:string,user:string,createdAt:Date}) => {
    try {
        const response = await axios.post(`${BASE_URL}/feed`, payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token'),
            },
        });
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error('Error creating feed item: ' + error.message);
        } else {
            throw new Error('Error creating feed item');
        }
    }
};
// Function to fetch feed items
export const fetchFeed = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/feed`, { headers });
        return response.data;  // Return the fetched feed items
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error fetching feed: ' + error.message);
        } else {
            throw new Error('Error fetching feed');
        }
    }
};