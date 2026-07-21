import { create } from "zustand";

interface LoadingState {
  globalLoading: boolean;
  activeTasks: Record<string, string>; // taskKey -> message
  setGlobalLoading: (loading: boolean) => void;
  startTask: (key: string, message?: string) => void;
  endTask: (key: string) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  globalLoading: false,
  activeTasks: {},
  setGlobalLoading: (globalLoading) => set({ globalLoading }),
  startTask: (key, message = "Loading...") =>
    set((state) => ({
      activeTasks: { ...state.activeTasks, [key]: message },
    })),
  endTask: (key) =>
    set((state) => {
      const copy = { ...state.activeTasks };
      delete copy[key];
      return { activeTasks: copy };
    }),
}));
