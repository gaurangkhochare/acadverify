import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, AuthContextType, UserRole } from '../types/auth';
import { authService } from '../services/authService';
import { MOCK_USERS } from '../services/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('auth_user');
    return savedUser ? JSON.parse(savedUser) : MOCK_USERS[0]; // default to institution admin for immediate mockup view
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token') || 'demo_token');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('auth_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }, [token]);

  const login = async (credentials: LoginCredentials): Promise<User> => {
    setIsLoading(true);
    try {
      const resp = await authService.login(credentials);
      setUser(resp.user);
      setToken(resp.token);
      return resp.user;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_token');
  };

  const switchRole = (role: UserRole) => {
    const targetUser = MOCK_USERS.find((u) => u.role === role) || {
      id: `usr_${role.toLowerCase()}`,
      name: `${role.replace('_', ' ')} (Demo User)`,
      email: `${role.toLowerCase()}@aicte-india.org`,
      role,
      institution_id: role === 'INSTITUTION_ADMIN' ? 'inst_01' : null,
      institution_name: role === 'INSTITUTION_ADMIN' ? 'Delhi Institute of Advanced Engineering & Technology' : null,
      status: 'active',
    };
    setUser(targetUser);
    setToken(`demo_token_${role}`);
    localStorage.setItem('demo_role', role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

