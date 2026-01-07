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
  const isCheckingAuthRef = React.useRef(false);

  const checkAuth = async () => {
    // Prevent multiple simultaneous calls
    if (isCheckingAuthRef.current) return;
    isCheckingAuthRef.current = true;

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      if (token) {
        try {
          // Set token in API client before making request
          setToken(token);
          
          // Try to get cached user first
          const cachedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
          if (cachedUser) {
            try {
              const parsedUser = JSON.parse(cachedUser);
              // Only set user if it's different to prevent unnecessary re-renders
              setUser(prevUser => {
                if (prevUser && prevUser.id === parsedUser.id && JSON.stringify(prevUser) === JSON.stringify(parsedUser)) {
                  return prevUser; // Return same object to prevent re-render
                }
                return parsedUser;
              });
              setLoading(false);
              
              // Fetch fresh data in background without blocking (only every 30 seconds)
              const lastFetch = typeof window !== 'undefined' ? parseInt(localStorage.getItem('lastUserFetch') || '0') : 0;
              const now = Date.now();
              if (now - lastFetch > 30000) { // Only fetch every 30 seconds
                localStorage.setItem('lastUserFetch', now.toString());
                authAPI.getMe().then(userData => {
                  // Update only if there are actual changes
                  const userDataStr = JSON.stringify(userData);
                  const parsedUserStr = JSON.stringify(parsedUser);
                  if (userDataStr !== parsedUserStr) {
                    if (userData.role === 'student' && userData.gradeLevel) {
                      localStorage.setItem('gradeLevel', userData.gradeLevel.toString());
                    }
                    localStorage.setItem('user', userDataStr);
                    setUser(userData);
                  }
                }).catch(() => {
                  // Silent fail - keep cached user
                });
              }
            } catch {
              // Invalid cached user, fetch fresh
            }
            
            if (cachedUser) return; // Only return if we successfully parsed
          }

          // No cached user, fetch from API
          const userData = await authAPI.getMe();

          // If student has no gradeLevel in user object, check localStorage
          if (userData.role === 'student' && !userData.gradeLevel) {
            const savedLevel = typeof window !== 'undefined' ? parseInt(localStorage.getItem('gradeLevel') || '0') : 0;
            if (savedLevel === 5 || savedLevel === 6) {
              userData.gradeLevel = savedLevel as 5 | 6;
            }
          } else if (userData.role === 'student' && userData.gradeLevel) {
            // Persist valid level to localStorage
            localStorage.setItem('gradeLevel', userData.gradeLevel.toString());
          }

          // Save user to localStorage
          localStorage.setItem('user', JSON.stringify(userData));
          setUser(userData);
        } catch (error) {
          // console.error('Session restoration failed:', error);
          // Token is invalid, remove it
          removeToken();
          localStorage.removeItem('gradeLevel');
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } finally {
      setLoading(false);
      isCheckingAuthRef.current = false;
    }
  };

  useEffect(() => {
    // Check if user is logged in on mount and restore session
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshUser = async () => {
    await checkAuth();
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await authAPI.login(username, password);
      
      // Save token
      setToken(response.token);
      
      // Save user data to both state and localStorage
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);

      // For students, handle grade level
      if (response.user.role === 'student') {
        const gradeLevel = response.user.gradeLevel || (typeof window !== 'undefined' ? parseInt(localStorage.getItem('gradeLevel') || '0') : 0);
        if (gradeLevel && (gradeLevel === 5 || gradeLevel === 6)) {
          // Save grade level
          localStorage.setItem('gradeLevel', gradeLevel.toString());
          // Use replace to prevent back button issues
          router.replace('/student/dashboard');
        } else {
          // No grade level set, go to select level
          router.replace('/student/select-level');
        }
      } else {
        router.replace(`/${response.user.role}/dashboard`);
      }
    } catch (error) {
      removeToken();
      localStorage.removeItem('user');
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
      
      // Save token and user data
      setToken(response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);

      if (response.user.role === 'student') {
        router.replace('/student/select-level');
      } else {
        router.replace(`/${response.user.role}/dashboard`);
      }
    } catch (error) {
      removeToken();
      localStorage.removeItem('user');
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem('gradeLevel');
    localStorage.removeItem('user');
    setUser(null);
    router.replace('/login');
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => {
      if (!prev) {
        const newUser = userData as User;
        localStorage.setItem('user', JSON.stringify(newUser));
        if (newUser.gradeLevel) {
          localStorage.setItem('gradeLevel', newUser.gradeLevel.toString());
        }
        return newUser;
      }
      
      const updatedUser = { ...prev, ...userData };
      
      // Only update if there are actual changes
      const prevStr = JSON.stringify(prev);
      const updatedStr = JSON.stringify(updatedUser);
      
      if (prevStr === updatedStr) {
        return prev; // Return same object to prevent re-render
      }

      // Save to localStorage
      localStorage.setItem('user', updatedStr);

      if (updatedUser.gradeLevel) {
        localStorage.setItem('gradeLevel', updatedUser.gradeLevel.toString());
      }

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




