import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../services/UserAPI";
import { AuthContext, User } from "./authContext";
import { setupAxiosInterceptors } from "./authInterceptor";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const saveTokensToLocalStorage = (activeToken: string) => {
    localStorage.setItem("token", activeToken);
  };

  const checkTokenExpiration = useCallback((token: string): boolean => {
    try {
      const decodedToken: { exp?: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp ? decodedToken.exp > currentTime : false;
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }, []);

  const removeExpiredToken = useCallback((token: string) => {
    localStorage.removeItem("token");
    const otherTokens = JSON.parse(localStorage.getItem("otherTokens") ?? "[]");
    const updatedOtherTokens = otherTokens.filter((t: string) => t !== token);
    localStorage.setItem("otherTokens", JSON.stringify(updatedOtherTokens));
  }, []);

  const safeGetUserData = useCallback(
    async (userId: string, token: string): Promise<User | null> => {
      if (!checkTokenExpiration(token)) {
        removeExpiredToken(token);
        return null;
      }

      try {
        return (await getUserData(userId, token)) as User;
      } catch (error) {
        console.log(token);
        console.error("Error fetching user data:", error);
        return null;
      }
    },
    [checkTokenExpiration, removeExpiredToken]
  );

  useEffect(() => {
    const initializeAuth = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get("code");

      if (code && activeUser?.token) {
        searchParams.delete("code");
        const newSearch = searchParams.toString();
        const newPath = `${location.pathname}${
          newSearch ? `?${newSearch}` : ""
        }`;
        navigate(newPath, { replace: true });
      }

      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          const decodedToken: {
            exp?: number;
            username: string;
            email: string;

            id: string;
          } = jwtDecode(storedToken);
          const userData = await safeGetUserData(decodedToken.id, storedToken);
          if (userData) {
            setIsAuthenticated(true);
            setActiveUser({
              username: userData.username,
              email: userData.email,
              token: storedToken,
              id: decodedToken.id,
            });
          } else {
            console.log("Token expired or user data fetch failed");
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Token is invalid", error);
          localStorage.removeItem("token");
        }
      }

      setIsAuthenticating(false);
    };

    initializeAuth();
  }, [
    activeUser?.token,
    location.pathname,
    location.search,
    navigate,
    safeGetUserData,
  ]);

  const login = async (email: string, password: string) => {
    console.log(email + password);
    console.log(BACKEND_URL);
    try {
      const response = await axios.post(`${BACKEND_URL}/users/login`, {
        email,
        password,
      });
      const data = response.data;

      const user = {
        username: data.user.username,
        email: data.user.email,
        token: data.accessToken,
        id: data.user.id,
      };
      saveTokensToLocalStorage(data.accessToken);
      setIsAuthenticated(true);
      setActiveUser(user);

      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      handleError(error, "login");
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users`, {
        username,
        email,
        password,
      });
      if (response.status === 201) {
        login(email, password);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      handleError(error, "registration");
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setActiveUser(null);
    navigate("/login");
  }, [navigate]);

  const clearActiveUser = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setActiveUser(null);
  }, []);

  const refreshUserData = async () => {
    if (!activeUser) {
      console.error("No active user to refresh");
      return;
    }

    try {
      const userData = await safeGetUserData(activeUser.id, activeUser.token);
      if (userData) {
        setActiveUser({
          ...activeUser,
          username: userData.username,
          email: userData.email,
        });
      } else {
        console.error("Failed to refresh user data");
        clearActiveUser();
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
      handleError(error, "refresh user data");
    }
  };

  const handleError = (error: unknown, context: string) => {
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data.error;
    }
  };

  useEffect(() => {
    setupAxiosInterceptors(logout);
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthenticating,
        activeUser,
        login,
        logout,
        register,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
