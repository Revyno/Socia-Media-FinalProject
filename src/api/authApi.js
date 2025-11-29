import apiService from './apiService';

export const authApi = {
  login: (userLogin) => apiService.post('/api/v1/login', userLogin),
  register: (userData) => apiService.post('/api/v1/register', userData),
  logout: () => apiService.get('/api/v1/logout'),
};