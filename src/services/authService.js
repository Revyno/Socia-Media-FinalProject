import { authApi } from '@/api/authApi';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        return { success: true, data: response.data };
      }
      return { success: false, message: 'Login failed' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Network error' };
    }
  },

  register: async (userData) => {
    try {
      const response = await authApi.register(userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        return { success: true, data: response.data };
      }
      return { success: false, message: 'Registration failed' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Network error' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};