import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // Return a default auth object instead of throwing error
    return {
      user: null,
      isAuthenticated: false,
      loading: false,
      login: async () => ({ success: false, message: 'Auth context not available' }),
      register: async () => ({ success: false, message: 'Auth context not available' }),
      logout: () => {},
      forgotPassword: async () => ({ success: false, message: 'Auth context not available' }),
      resetPassword: async () => ({ success: false, message: 'Auth context not available' })
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      // Simulate API call
      const mockResponse = await new Promise((resolve) => {
        setTimeout(() => {
          // Mock successful login
          if (credentials.email === 'admin@test.com' && credentials.password === 'password') {
            resolve({
              success: true,
              user: {
                id: 1,
                name: 'G A P Pathum',
                email: 'admin@test.com',
                role: 'admin',
                avatar: 'GAP'
              },
              token: 'mock-jwt-token-123'
            });
          } else {
            resolve({
              success: false,
              message: 'Invalid credentials'
            });
          }
        }, 1000);
      });

      if (mockResponse.success) {
        localStorage.setItem('authToken', mockResponse.token);
        localStorage.setItem('userData', JSON.stringify(mockResponse.user));
        setUser(mockResponse.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: mockResponse.message };
      }
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call
      const mockResponse = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            user: {
              id: Date.now(),
              name: `${userData.firstName} ${userData.lastName}`,
              email: userData.email,
              role: 'user',
              avatar: `${userData.firstName[0]}${userData.lastName[0]}`
            },
            token: 'mock-jwt-token-' + Date.now()
          });
        }, 1000);
      });

      if (mockResponse.success) {
        localStorage.setItem('authToken', mockResponse.token);
        localStorage.setItem('userData', JSON.stringify(mockResponse.user));
        setUser(mockResponse.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: mockResponse.message };
      }
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  const forgotPassword = async (email) => {
    try {
      // Simulate API call
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });

      return { success: true, message: 'Password reset email sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send reset email' };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      // Simulate API call
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 1000);
      });

      return { success: true, message: 'Password reset successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to reset password' };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
