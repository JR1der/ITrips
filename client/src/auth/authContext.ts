import { createContext } from 'react';

export type User = {
  username: string;
  email: string;
  token: string;
  id: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  activeUser: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (username: string, email: string, password: string) => void;
  refreshUserData: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
