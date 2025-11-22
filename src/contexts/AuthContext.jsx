import { createContext, useState, useEffect } from 'react';
import { authApi } from '@/api/authApi';
import { userApi } from '@/api/userApi';

export const AuthContext = createContext(null);

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
      // setLoading(false);
    }
  }, [token]);

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.data);
    return res.data;
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