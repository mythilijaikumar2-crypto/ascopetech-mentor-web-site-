import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface OnboardingData {
  fullName: string;
  degree: string;
  college: string;
  graduationYear: string;
  skills: string[];
  experienceLevel: number; // in years
  interests: string[];
  preferredWorkEnvironment: string;
  resumeFileName?: string;
  onboardingCompleted: boolean;
}

interface ProfileState {
  onboarding: OnboardingData | null;
  selectedGoal: string | null; // Selected career path ID (e.g. 'frontend-developer')
  setOnboarding: (data: Partial<OnboardingData>) => void;
  setSelectedGoal: (careerId: string | null) => void;
  resetProfile: () => void;
}

const initialOnboarding: OnboardingData = {
  fullName: "",
  degree: "",
  college: "",
  graduationYear: "",
  skills: [],
  experienceLevel: 0,
  interests: [],
  preferredWorkEnvironment: "Remote",
  onboardingCompleted: false,
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      onboarding: null,
      selectedGoal: null,
      setOnboarding: (data) => {
        set((state) => ({
          onboarding: {
            ...(state.onboarding || initialOnboarding),
            ...data,
          },
        }));
      },
      setSelectedGoal: (careerId) => {
        set({ selectedGoal: careerId });
      },
      resetProfile: () => {
        set({ onboarding: null, selectedGoal: null });
      },
    }),
    {
      name: "career_ai_profile",
    }
  )
);
