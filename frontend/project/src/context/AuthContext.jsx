import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
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

  const login = async (email, password) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json(); // { message, token }
      
      console.log('Login response:', { ...data, token: data.token ? data.token.substring(0, 10) + '...' : 'none' });
      
      if (!data.token) {
        console.error('No token received from backend during login');
        throw new Error('Authentication failed: No token received');
      }

      // Store token
      localStorage.setItem('token', data.token);
      console.log('Token saved to localStorage');
      
      // Verify token was saved correctly
      const savedToken = localStorage.getItem('token');
      console.log('Token verification:', {
        tokenReceived: !!data.token,
        tokenSaved: !!savedToken,
        tokenMatch: savedToken === data.token
      });

      // For demonstration, create user from email only; use your backend user details if available
      const user = { id: '', username: '', email };

      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const register = async (username, email, password) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${baseUrl}/api/auth/register`, {
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
      const user = { id: '', username, email };

      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
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

  // Helper function to check auth state - can be called from anywhere
  const checkAuthState = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('Auth State Check:', {
      isAuthenticated: authState.isAuthenticated,
      tokenExists: !!token,
      userDataExists: !!userData,
      tokenPreview: token ? token.substring(0, 10) + '...' : 'none'
    });
    
    return {
      isAuthenticated: authState.isAuthenticated,
      hasToken: !!token,
      hasUserData: !!userData
    };
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout, checkAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
