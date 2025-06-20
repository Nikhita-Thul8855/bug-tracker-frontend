
import axios from 'axios';

const projectAPI = axios.create({
  baseURL: '/api/projects', // proxy will forward to backend
});

// Optional: Add token automatically if using auth
projectAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default projectAPI;