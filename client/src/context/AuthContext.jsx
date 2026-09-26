import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('rethread_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data);
      localStorage.setItem('rethread_user', JSON.stringify(data));
      toast.success(`Welcome back, ${data.name}! 🌿`);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', userData);
      setUser(data);
      localStorage.setItem('rethread_user', JSON.stringify(data));
      toast.success(`Welcome to Rethread, ${data.name}! +50 Eco Points earned! 🌱`);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed.';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rethread_user');
    toast.success('Signed out. See you soon!');
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const { data } = await api.put('/auth/profile', profileData);
      setUser(data);
      localStorage.setItem('rethread_user', JSON.stringify(data));
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Could not update profile.';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    if (!user) return;
    try {
      const { data } = await api.get('/auth/profile');
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('rethread_user', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to refresh user profile:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        refreshUser,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
