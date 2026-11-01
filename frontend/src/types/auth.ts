export type UserRole = 'AICTE_ADMIN' | 'INSTITUTION_ADMIN' | 'VERIFIER' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution_id?: string | null;
  institution_name?: string | null;
  apaar_id?: string;
  avatar_url?: string;
  status: 'active' | 'suspended';
  created_at?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  role?: UserRole;
}

export interface RegistrationPayload {
  role: UserRole;
  name: string;
  email: string;
  password?: string;
  aicte_reference?: string;
  institution_name?: string;
  state?: string;
  campus?: string;
  designation?: string;
  organization_name?: string;
  verification_purpose?: string;
  apaar_id?: string;
  dob?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  loginWithGoogle: (roleHint?: UserRole) => Promise<User>;
  loginWithJanParichay: () => Promise<User>;
  register: (payload: RegistrationPayload) => Promise<User>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}
