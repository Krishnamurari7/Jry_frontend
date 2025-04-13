import axios from 'axios';

// Create axios instance with base URL
const instance = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

// Add request interceptor to handle authentication
instance.interceptors.request.use(
  (config) => {
    // Add any request configuration here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login page on unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance; 