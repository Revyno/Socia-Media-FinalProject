import { authApi } from '@/api/authApi';

export const authService = {
  login: async (email,password) => {

    // try {
    //   const response = await authApi.login(credentials);
    //   if (response.data.token) {
    //     localStorage.setItem('token', response.data.token);
    //     return { success: true, data: response.data };
    //   }
    //   return { success: false, message: 'Login failed' };
    // } catch (error) {
    //   return { success: false, message: error.response?.data?.message || 'Network error' };
    // }
    try {
      const credentials = {
        email: email,
        password: password
      };
      
      console.log('Sending login request:', credentials); // Debug
      
      const response = await authApi.login(credentials);
      console.log('Login response:', response); // Debug
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        return { success: true, data: response.data };
      }
      return { success: false, message: 'Login failed - no token received' };
    } catch (error) {
      console.log('Login error details:', error.response); // Debug lengka
   if (error.response && typeof error.response.data === 'string' && error.response.data.includes('<!DOCTYPE html>')) {
        return { 
          success: false, 
          message: 'Server error: Please try again later' 
        };
      }
      
      return { 
        success: false, 
        message: error.response?.data?.message || 'Invalid email or password' 
      };
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