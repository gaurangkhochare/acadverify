import { request } from './api';
import { User, LoginCredentials, AuthResponse, UserRole } from '../types/auth';
import { MOCK_USERS } from './mockData';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      return await request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      // Offline fallback: match mock user by role or email
      const matched = MOCK_USERS.find(
        (u) =>
          u.email.toLowerCase() === credentials.email.toLowerCase() ||
          (credentials.role && u.role === credentials.role)
      ) || MOCK_USERS[0];

      return {
        token: `mock_jwt_token_${matched.id}`,
        user: matched,
      };
    }
  },

  async getMe(): Promise<User> {
    try {
      return await request<User>('/auth/me');
    } catch {
      const storedRole = localStorage.getItem('demo_role') as UserRole;
      const matched = MOCK_USERS.find((u) => u.role === storedRole) || MOCK_USERS[0];
      return matched;
    }
  },

  async logout(): Promise<void> {
    try {
      await request('/auth/logout', { method: 'POST' });
    } catch {
      // offline logout is handled in context
    }
  },
};

