import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ENV } from "../config/env";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ENV.STALE_TIME_MS,
      gcTime: ENV.CACHE_TIME_MS,
      retry: (failureCount, error: any) => {
        if (error?.status === 404 || error?.status === 401) return false;
        return failureCount < ENV.MAX_RETRIES;
      },
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

export const QueryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
