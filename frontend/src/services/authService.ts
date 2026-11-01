import { request } from './api';
import { User, LoginCredentials, AuthResponse, UserRole, RegistrationPayload } from '../types/auth';
import { MOCK_USERS } from './mockData';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      return await request<AuthResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch {
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

  async loginWithGoogle(roleHint: UserRole = 'INSTITUTION_ADMIN'): Promise<AuthResponse> {
    try {
      return await request<AuthResponse>('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ role: roleHint }),
      });
    } catch {
      // Offline fallback simulation: selects or creates verified Google workspace user
      let matched = MOCK_USERS.find((u) => u.role === roleHint);
      if (!matched) {
        matched = {
          id: `usr_google_${Date.now()}`,
          name: 'Google Verified User',
          email: 'verified.user@workspace.ac.in',
          role: roleHint,
          institution_id: roleHint === 'INSTITUTION_ADMIN' ? 'inst_01' : null,
          institution_name: roleHint === 'INSTITUTION_ADMIN' ? 'Vidyalankar Institute of Technology' : null,
          status: 'active',
        };
      }
      return {
        token: `google_oauth_token_${matched.id}`,
        user: matched,
      };
    }
  },

  async loginWithJanParichay(): Promise<AuthResponse> {
    try {
      return await request<AuthResponse>('/auth/jan-parichay', { method: 'POST' });
    } catch {
      // National SSO Jan Parichay defaults to AICTE / Official Regulator
      const aicteUser = MOCK_USERS.find((u) => u.role === 'AICTE_ADMIN') || MOCK_USERS[1];
      return {
        token: `jan_parichay_sso_token_${aicteUser.id}`,
        user: aicteUser,
      };
    }
  },

  async register(payload: RegistrationPayload): Promise<AuthResponse> {
    try {
      return await request<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    } catch {
      // Offline fallback: create active session for registered entity
      const newUser: User = {
        id: `usr_reg_${Date.now().toString().slice(-6)}`,
        name: payload.name,
        email: payload.email,
        role: payload.role,
        institution_id: payload.role === 'INSTITUTION_ADMIN' ? 'inst_new' : null,
        institution_name: payload.institution_name || (payload.role === 'INSTITUTION_ADMIN' ? 'Newly Registered Institute' : null),
        apaar_id: payload.apaar_id,
        status: 'active',
        created_at: new Date().toISOString(),
      };
      return {
        token: `registered_token_${newUser.id}`,
        user: newUser,
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
