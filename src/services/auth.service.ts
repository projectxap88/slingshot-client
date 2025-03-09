import axios from 'axios';
import { API_URL } from '@/config/constants';
import { cookies } from '@/utils/cookies';

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: {
    user: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      avatar?: string;
      role: string;
    };
    token: string;
  };
  message: string;
}



class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }


  public  handleGoogleLogin = () => {
    window.open(`${API_URL}/auth/google`, '_self');
  };

  public async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/register`,
        data
      );
      localStorage.setItem('token', response.data.data.token);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw error;
    }
  }

 
  public async login(data: LoginData): Promise<void> {
    try {
      const { data: response } = await axios.post<LoginResponse>(`${API_URL}/auth/login`, data);
      cookies.setToken(response.data.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to login');
      }
      throw error;
    }
  }

  public logout(): void {
    cookies.removeToken();
  }

  public getToken(): string | undefined {
    return cookies.getToken();
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public async verifyEmail(email: string, otp: string): Promise<void> {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-email`, {
        email,
        otp
      });
      
      // Store the token after successful verification
      localStorage.setItem('token', response.data.data.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to verify email');
      }
      throw error;
    }
  }
}

export const authService = AuthService.getInstance(); 