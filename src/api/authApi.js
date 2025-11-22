import apiService from './apiService';

export const authApi = {
  login: (credentials) => apiService.post('/api/v1/login', credentials),
  register: (userData) => apiService.post('/api/v1/register', userData),
  logout: () => apiService.get('/api/v1/logout'),
};