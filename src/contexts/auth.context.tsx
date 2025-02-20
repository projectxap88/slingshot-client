import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/auth.service';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = authService.getToken();
    if (token) {
      // Optionally verify token and fetch user data
      setUser({}); // Replace with actual user data
    }
    setLoading(false);
  }, []);

  const value = {
    isAuthenticated: authService.isAuthenticated(),
    user,
    loading,
    login: async (email: string, password: string) => {
      const response = await authService.login({ email, password });
      setUser(response.data.user);
    },
    logout: () => {
      authService.logout();
      setUser(null);
    },
    register: async (email: string, password: string) => {
      const response = await authService.register({ email, password });
      setUser(response.data.user);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 