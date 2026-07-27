import axiosInstance from './axios';

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post('/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axiosInstance.post('/register', userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const verifyOtp = async (data) => {
  const response = await axiosInstance.post('/auth/verify/otp', data);
  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await axiosInstance.post('/auth/forgot-password', data);
  return response.data;
};

export const verifyForgotOtp = async (data) => {
  const response = await axiosInstance.post('/auth/verify-forgot-password-otp', data);
  return response.data;
};

export const changePassword = async (data) => {
  const response = await axiosInstance.post('/auth/change-password', data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post('/logout');
  return response.data;
};

export const getProfile = async () => {
  const response = await axiosInstance.get('/current-user');
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await axiosInstance.patch('/update-account', userData);
  return response.data;
};
