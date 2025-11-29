import { useState, useEffect } from 'react';
import { AuthContext } from './authContext';
import { authApi } from '@/api/authApi';
import { userApi } from '@/api/userApi';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      userApi.getCurrentUser()
        .then(res => setUser(res.data.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  // const login = async (credentials) => {
  //   const res = await authApi.login(credentials);
  //   localStorage.setItem('token', res.data.token);
  //   setUser(res.data.data);
  //   return res.data;
  // };

const login = async (email, password) => { // TERIMA 2 PARAMETER
    try {
      const credentials = { email, password };
      const res = await authApi.login(credentials);
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.data);
        return { success: true, data: res.data };
      } else {
        return { success: false, message: 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}
