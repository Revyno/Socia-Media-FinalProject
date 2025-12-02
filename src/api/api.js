// Axios instance dengan interceptors
import axios from 'axios';
import { API_CONFIG } from './config';

const apiService = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'apiKey': API_CONFIG.API_KEY,
    'Content-Type': 'application/json',
  },
});

// Request interceptor (add token)
apiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor (handle errors)
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default apiService;