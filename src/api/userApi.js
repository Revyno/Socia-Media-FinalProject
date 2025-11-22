import apiService from '../apiService';

export const userApi = {
  getCurrentUser: () => apiService.get('/api/v1/user'),
  updateProfile: (data) => apiService.post('/api/v1/update-profile', data),
  getUserById: (id) => apiService.get(`/api/v1/user/${id}`),
};