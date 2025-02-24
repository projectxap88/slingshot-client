import axios from 'axios';
import { API_URL } from '@/config/constants';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  onboardingCompleted: boolean;
  onboardingCompletedAt?: Date;
  role: string;
  isActive: boolean;
}

class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  private getAuthHeaders(token: string) {
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  public async getCurrentUser(token: string): Promise<User> {
    try {
      const response = await axios.get<{ data: User; message: string }>(
        `${API_URL}/user/me`,
        this.getAuthHeaders(token)
      );
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch user data');
      }
      throw error;
    }
  }
}

export const userService = UserService.getInstance(); 