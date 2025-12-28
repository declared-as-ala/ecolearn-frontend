'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, usersAPI, User, setToken, removeToken } from '@/lib/api';
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
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      try {
        // Set token in API client before making request
        setToken(token);
        const userData = await authAPI.getMe();

        // If student has no gradeLevel in user object, check localStorage
        if (userData.role === 'student' && !userData.gradeLevel) {
          const savedLevel = typeof window !== 'undefined' ? parseInt(localStorage.getItem('gradeLevel') || '0') : 0;
          if (savedLevel === 5 || savedLevel === 6) {
            userData.gradeLevel = savedLevel as 5 | 6;
            // Update backend as well if missing
            usersAPI.updateGradeLevel(savedLevel as 5 | 6).catch(console.error);
          }
        } else if (userData.role === 'student' && userData.gradeLevel) {
          // Persist valid level to localStorage
          localStorage.setItem('gradeLevel', userData.gradeLevel.toString());
        }

        setUser(userData);
      } catch (error) {
        console.error('Session restoration failed:', error);
        // Token is invalid, remove it
        removeToken();
        localStorage.removeItem('gradeLevel'); // Clear level too if session failed
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Check if user is logged in on mount and restore session
    checkAuth();
  }, []);

  const refreshUser = async () => {
    await checkAuth();
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await authAPI.login(username, password);
      setToken(response.token);
      setUser(response.user);

      // For students, handle grade level
      if (response.user.role === 'student') {
        const gradeLevel = response.user.gradeLevel || (typeof window !== 'undefined' ? parseInt(localStorage.getItem('gradeLevel') || '0') : 0);
        if (gradeLevel && (gradeLevel === 5 || gradeLevel === 6)) {
          // If we have a local level but not in user object, sync it
          if (!response.user.gradeLevel) {
            await usersAPI.updateGradeLevel(gradeLevel as 5 | 6).catch(console.error);
          }
          localStorage.setItem('gradeLevel', gradeLevel.toString());
          router.push('/student/dashboard');
        } else {
          router.push('/student/select-level');
        }
      } else {
        router.push(`/${response.user.role}/dashboard`);
      }
    } catch (error) {
      removeToken();
      throw error;
    }
  };

  const register = async (data: {
    username: string;
    email: string;
    password: string;
    role: string;
    profile?: any;
  }) => {
    try {
      const response = await authAPI.register(data);
      setToken(response.token);
      setUser(response.user);

      if (response.user.role === 'student') {
        router.push('/student/select-level');
      } else {
        router.push(`/${response.user.role}/dashboard`);
      }
    } catch (error) {
      removeToken();
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem('gradeLevel');
    setUser(null);
    router.push('/login');
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => {
      if (!prev) return userData as User;
      const updatedUser = { ...prev, ...userData };

      if (updatedUser.gradeLevel) {
        localStorage.setItem('gradeLevel', updatedUser.gradeLevel.toString());
      }

      console.log('🔄 [AuthContext] User updated:', {
        points: updatedUser.points,
        level: updatedUser.level,
        badgesCount: updatedUser.badges?.length
      });

      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, refreshUser }}>
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




