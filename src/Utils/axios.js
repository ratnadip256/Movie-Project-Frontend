import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://movie-project-backend-beige.vercel.app/api/v1/users';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

// Response interceptor to handle 401s and refresh tokens
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // Prevent infinite loop if the refresh token call itself fails
      if (originalRequest.url === '/refresh-token') {
        return Promise.reject(error);
      }
      
      originalRequest._retry = true;
      try {
        await axiosInstance.post('/refresh-token');
        // If successful, the new secure cookies are automatically set by the browser.
        // We can immediately retry the original request.
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, we just reject.
        // The Redux state will handle setting isAuthenticated to false.
        // React Router will smoothly redirect if they are on a protected route.
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
