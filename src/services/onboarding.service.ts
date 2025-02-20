import axios from 'axios';
import { authService } from './auth.service';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export interface CareerPreferences {
  desiredRole?: string[];
  yearsOfExperience?: number;
  preferredLocations?: string[];
  remotePreference?: 'remote' | 'hybrid' | 'onsite';
  expectedSalary?: {
    min: number;
    max: number;
    currency: string;
  };
  industries?: string[];
  skills?: string[];
}

export interface JobSearchSettings {
  isActivelySearching: boolean;
  availabilityDate?: Date;
  noticePeriod?: number;
  visaStatus?: string;
  workAuthorization?: string[];
}

export interface OnboardingData {
  firstName: string;
  lastName: string;
  careerPreferences: CareerPreferences;
  jobSearchSettings: JobSearchSettings;
  resume?: File;
  linkedinProfile?: string;
  githubProfile?: string;
  portfolioUrl?: string;
}

class OnboardingService {
  private static instance: OnboardingService;

  private constructor() {}

  public static getInstance(): OnboardingService {
    if (!OnboardingService.instance) {
      OnboardingService.instance = new OnboardingService();
    }
    return OnboardingService.instance;
  }

  private getAuthHeaders() {
    const token = authService.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  public async updateProfile(data: Partial<OnboardingData>): Promise<void> {
    try {
      await axios.patch(
        `${API_URL}/users/profile`,
        data,
        this.getAuthHeaders()
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to update profile');
      }
      throw error;
    }
  }

  public async uploadResume(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await axios.post(
        `${API_URL}/onboarding/documents`,
        formData,
        {
          ...this.getAuthHeaders(),
          headers: {
            ...this.getAuthHeaders().headers,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return response.data.url;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to upload resume');
      }
      throw error;
    }
  }

  public async updateCareerPreferences(data: CareerPreferences): Promise<void> {
    try {
      await axios.patch(
        `${API_URL}/users/career-preferences`,
        data,
        this.getAuthHeaders()
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to update career preferences');
      }
      throw error;
    }
  }

  public async updateJobSearchSettings(data: JobSearchSettings): Promise<void> {
    try {
      await axios.patch(
        `${API_URL}/users/job-search-settings`,
        data,
        this.getAuthHeaders()
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to update job search settings');
      }
      throw error;
    }
  }

  public async completeOnboarding(data: any): Promise<void> {
    try {
      // First upload any files if they exis
      // Mark onboarding as complete
      await axios.post(
        `${API_URL}/onboarding/complete`,
        {},
        this.getAuthHeaders()
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to complete onboarding');
      }
      throw error;
    }
  }

  public async updatePersonalInfo(data: { 
    fullName: string; 
    bio: string; 
    skills: string[]; 
  }): Promise<void> {
    try {
      await axios.patch(
        `${API_URL}/onboarding/personal-info`,
        data,
        this.getAuthHeaders()
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to update personal info');
      }
      throw error;
    }
  }

  public async uploadDocuments(files: {
    cv?: File;
    writingSample?: File;
  }): Promise<void> {
    try {
      const formData = new FormData();
      if (files.cv) formData.append('cv', files.cv);
      if (files.writingSample) formData.append('writingSample', files.writingSample);

      await axios.post(
        `${API_URL}/onboarding/documents`,
        formData,
        {
          ...this.getAuthHeaders(),
          headers: {
            ...this.getAuthHeaders().headers,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to upload documents');
      }
      throw error;
    }
  }

  public async saveDocumentText(data: {
    cvText?: string;
    writingSampleText?: string;
  }): Promise<void> {
    try {
      await axios.post(
        `${API_URL}/onboarding/documents/text`,
        data,
        this.getAuthHeaders()
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to save document text');
      }
      throw error;
    }
  }
}

export const onboardingService = OnboardingService.getInstance(); 