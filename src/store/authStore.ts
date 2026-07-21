import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  name: string;
  email: string;
  role: "candidate" | "admin";
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, role: "candidate" | "admin", name?: string) => void;
  logout: () => void;
  register: (name: string, email: string) => void;
  updateProfile: (name: string, email: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (email, role, name = "") => {
        set({
          isAuthenticated: true,
          user: {
            email,
            role,
            name: name || (role === "admin" ? "Systems Administrator" : "Candidate User"),
          },
        });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
        localStorage.removeItem("career_ai_profile");
        localStorage.removeItem("career_ai_resumes");
        localStorage.removeItem("career_ai_interviews");
        localStorage.removeItem("career_ai_roadmaps");
        localStorage.removeItem("career_ai_notifications");
      },
      register: (name, email) => {
        set({
          isAuthenticated: true,
          user: {
            name,
            email,
            role: "candidate",
          },
        });
      },
      updateProfile: (name, email) => {
        set((state) => ({
          user: state.user ? { ...state.user, name, email } : null,
        }));
      },
    }),
    {
      name: "career_ai_auth",
    }
  )
);
