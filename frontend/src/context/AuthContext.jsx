import React, { createContext, useContext, useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth on mount
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.post('/auth/is-auth');
        if (res.data.success) {
          setIsAuthenticated(true);
          // Optionally fetch user data
          const userRes = await axiosInstance.get('/user/getdata');
          setUser(userRes.data.userData);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/login', { email, password });
      if (res.data.success) {
        setIsAuthenticated(true);
        // Optionally fetch user data
        const userRes = await axiosInstance.get('/user/getdata');
        setUser(userRes.data.userData);
        navigate('/input');
        return { success: true };
      } else {
        setIsAuthenticated(false);
        setUser(null);
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      return { success: false, message: err?.response?.data?.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axiosInstance.post('/auth/logout');
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
    } catch {}
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 