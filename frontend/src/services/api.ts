/**
 * API Client matching docs/API-CONTRACTS.md
 * Base path: /api/v1
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Array<{ field?: string; message: string }>;
  };
}

export class ApiError extends Error {
  code: string;
  details?: Array<{ field?: string; message: string }>;
  status: number;

  constructor(status: number, message: string, code: string = 'API_ERROR', details?: any[]) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const token = localStorage.getItem('auth_token');
  const headers: HeadersInit = {
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  // Only add Content-Type: application/json if body is not FormData
  if (!(options.body instanceof FormData) && !('Content-Type' in (headers as Record<string, string>))) {
    (headers as Record<string, string>)['Content-Type'] = 'application/json';
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      let errorData: ApiErrorResponse | null = null;
      try {
        errorData = await res.json();
      } catch {
        // Response wasn't JSON
      }

      const message = errorData?.error?.message || `HTTP error ${res.status}: ${res.statusText}`;
      const code = errorData?.error?.code || 'HTTP_ERROR';
      const details = errorData?.error?.details;

      throw new ApiError(res.status, message, code, details);
    }

    // Check if 204 No Content
    if (res.status === 204) {
      return {} as T;
    }

    return await res.json();
  } catch (err: any) {
    if (err instanceof ApiError) {
      throw err;
    }
    // Network errors or offline fallback
    throw new ApiError(0, err.message || 'Network connection failed', 'NETWORK_ERROR');
  }
}

