import { useState, useEffect } from 'react';
import { authApi } from '@/api/authApi';
import { userApi } from '@/api/userApi';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      userApi.getCurrentUser()
        .then(res => setUser(res.data.data))
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setTimeout(() => setLoading(false), 0);
    }
  }, [token]);

  const login = async (credentials) => {
    try {
      const res = await authApi.login(credentials);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.data || res.data.user);
        return { success: true, data: res.data };
      }
      return { 
        success: false, 
        message: 'Login failed: No token received' 
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || error.message || 'Login failed. Please try again.' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authApi.register(userData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.data || res.data.user);
        return { success: true, data: res.data };
      }
      return { 
        success: false, 
        message: 'Registration failed: No token received' 
      };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || error.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}