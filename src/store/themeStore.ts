import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  resolvedTheme: "light" | "dark";
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "system",
      resolvedTheme: "light",
      setTheme: (theme: ThemeMode) => {
        set({ theme });
        applyTheme(theme);
      },
    }),
    {
      name: "career_ai_theme_mode",
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

export function applyTheme(themeMode: ThemeMode) {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = themeMode === "dark" || (themeMode === "system" && systemDark);

  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  useThemeStore.setState({ resolvedTheme: isDark ? "dark" : "light" });
}

// System color scheme change listener
if (typeof window !== "undefined") {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const currentTheme = useThemeStore.getState().theme;
    if (currentTheme === "system") {
      applyTheme("system");
    }
  });
}
