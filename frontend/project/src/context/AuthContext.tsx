import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check local storage for token and user data on initial load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);

        // Ideally, you might want to validate token expiry here or fetch fresh user data

        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch('http://localhost:8383/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json(); // { message, token }

      // Store token
      localStorage.setItem('token', data.token);

      // For demonstration, create user from email only; use your backend user details if available
      const user: User = { id: '', username: '', email };

      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const response = await fetch('http://localhost:8383/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      // You might want to auto-login after registration or ask user to login manually.
      // Here we just update auth state with the registered user info.
      const user: User = { id: '', username, email };

      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};