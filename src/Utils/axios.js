import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://movie-project-backend-beige.vercel.app/api/v1/users';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

// Request interceptor to attach Authorization header from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401s, token persistence, and network errors
axiosInstance.interceptors.response.use(
  (response) => {
    // Automatically extract and store tokens if returned in JSON response payload
    const payloadData = response.data?.data;
    if (payloadData?.accessToken) {
      localStorage.setItem('accessToken', payloadData.accessToken);
    }
    if (payloadData?.refreshToken) {
      localStorage.setItem('refreshToken', payloadData.refreshToken);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle Network Errors (DNS failure, network timeout, Jio ISP blocking)
    if (!error.response) {
      const customError = new Error(
        "Network connection error. Please check your SIM/Wi-Fi connection or try again."
      );
      customError.isNetworkError = true;
      return Promise.reject(customError);
    }
    
    // If the error status is 401 and there is no originalRequest._retry flag
    if (error.response && error.response.status === 401 && originalRequest && !originalRequest._retry) {
      if (originalRequest.url === '/refresh-token') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(error);
      }
      
      originalRequest._retry = true;
      try {
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const refreshRes = await axiosInstance.post('/refresh-token', {
          refreshToken: storedRefreshToken,
        });

        const newAccessToken = refreshRes.data?.data?.accessToken;
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
