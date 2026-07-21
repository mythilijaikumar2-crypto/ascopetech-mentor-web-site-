import React, { createContext, useContext, ReactNode } from "react";
import { useAuthStore, User } from "../store/authStore";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: "candidate" | "admin", name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, login: storeLogin, logout: storeLogout } = useAuthStore();

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login: storeLogin,
        logout: storeLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
