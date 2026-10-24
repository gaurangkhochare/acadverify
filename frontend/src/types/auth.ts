export type UserRole = 'AICTE_ADMIN' | 'INSTITUTION_ADMIN' | 'VERIFIER' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution_id?: string | null;
  institution_name?: string | null;
  status: 'active' | 'suspended';
  created_at?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  role?: UserRole;
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
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

