import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  onboardingCompleted: boolean;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR' };

// Load initial state from localStorage
const loadState = (): AuthState => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

// Save state to localStorage
const saveState = (state: AuthState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    // Handle write errors
    console.error('Failed to save auth state:', err);
  }
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  const newState = (() => {
    switch (action.type) {
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload
        };
      case 'SET_USER':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          loading: false
        };
      case 'SET_ERROR':
        return {
          ...state,
          error: action.payload,
          loading: false
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: null
        };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          error: null,
          loading: false
        };
      case 'AUTH_ERROR':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          loading: false
        };
      default:
        return state;
    }
  })();
  
  // Save to localStorage after every state change
  saveState(newState);
  return newState;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, loadState());

  useEffect(() => {
    const initializeAuth = async () => {
      const token = authService.getToken();
      if (token) {
        try {
          const userData = await userService.getCurrentUser(token);
          dispatch({ type: 'SET_USER', payload: userData });
        } catch (error) {
          dispatch({ type: 'AUTH_ERROR' });
          authService.logout();
          localStorage.removeItem('authState'); // Clear persisted state on error
        }
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await authService.login({ email, password });
      const token = authService.getToken();
      if (token) {
        const userData = await userService.getCurrentUser(token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Login failed' 
      });
    }
  };

  // Clear localStorage on logout
  const logout = () => {
    authService.logout();
    localStorage.removeItem('authState');
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await authService.register({ email, password });
      const token = authService.getToken();
      if (token) {
        const userData = await userService.getCurrentUser(token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      }
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Registration failed' 
      });
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...state, 
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 