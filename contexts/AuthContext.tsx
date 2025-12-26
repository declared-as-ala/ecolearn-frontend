'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, User, setToken, removeToken } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: {
    username: string;
    email: string;
    password: string;
    role: string;
    profile?: any;
  }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount and restore session
    const checkAuth = async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        try {
          // Set token in API client before making request
          setToken(token);
          const userData = await authAPI.getMe();
          setUser(userData);
        } catch (error) {
          // Token is invalid, remove it
          removeToken();
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await authAPI.login(username, password);
    setToken(response.token);
    setUser(response.user);
    
    // For students, check if grade level is set
    if (response.user.role === 'student') {
      const gradeLevel = response.user.gradeLevel || (typeof window !== 'undefined' ? parseInt(localStorage.getItem('gradeLevel') || '0') : 0);
      if (!gradeLevel || (gradeLevel !== 5 && gradeLevel !== 6)) {
        router.push('/student/select-level');
        return;
      }
    }
    
    router.push(`/${response.user.role}/dashboard`);
  };

  const register = async (data: {
    username: string;
    email: string;
    password: string;
    role: string;
    profile?: any;
  }) => {
    const response = await authAPI.register(data);
    setToken(response.token);
    setUser(response.user);
    
    // For students, redirect to level selection if no level is set
    if (response.user.role === 'student') {
      const gradeLevel = response.user.gradeLevel || (typeof window !== 'undefined' ? parseInt(localStorage.getItem('gradeLevel') || '0') : 0);
      if (!gradeLevel || (gradeLevel !== 5 && gradeLevel !== 6)) {
        router.push('/student/select-level');
        return;
      }
    }
    
    router.push(`/${response.user.role}/dashboard`);
  };

  const logout = () => {
    removeToken();
    setUser(null);
    router.push('/login');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};




