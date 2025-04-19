"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "@/utils/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token and user data in localStorage on mount
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      // Set the initial state
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
      authAPI.setToken(token);

      // Verify the token with the server
      verifyToken(token);
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await authAPI.getMe();
      if (response.data.status === "success") {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
      } else {
        // Token is invalid, clear storage
        logout();
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      console.log("Full login response:", response);

      if (response.data.success) {
        const { token, user } = response.data;

        // Store token and user data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        authAPI.setToken(token);

        // Update state
        setUser(user);
        setIsAuthenticated(true);

        return {
          success: true,
          user,
          message: "Login successful",
        };
      }

      return {
        success: false,
        message: response.data.message || "Invalid login response",
      };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await authAPI.register({ name, email, password });

      if (response.data.success) {
        const { token, user } = response.data;

        // Store token and user data
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        authAPI.setToken(token);

        // Update state
        setUser(user);
        setIsAuthenticated(true);

        return {
          success: true,
          user,
          message: "Registration successful",
        };
      }

      return { success: false, message: response.data.message };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    authAPI.setToken(null);

    // Update state
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
