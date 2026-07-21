import { create } from "zustand";

interface NetworkState {
  isOnline: boolean;
  setOnline: (isOnline: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,
  setOnline: (isOnline) => set({ isOnline }),
}));

if (typeof window !== "undefined") {
  window.addEventListener("online", () => useNetworkStore.getState().setOnline(true));
  window.addEventListener("offline", () => useNetworkStore.getState().setOnline(false));
}
