import { useNetworkStore } from "../store/networkStore";

export function useOnlineStatus() {
  const isOnline = useNetworkStore((state) => state.isOnline);
  return isOnline;
}
