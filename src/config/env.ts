export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://api.ascopetech.in",
  WS_BASE_URL: import.meta.env.VITE_WS_BASE_URL || "wss://api.ascopetech.in/ws",
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK !== "false", // default to true if backend unavailable
  ENV: import.meta.env.MODE || "development",
  MAX_RETRIES: 3,
  STALE_TIME_MS: 1000 * 60 * 5, // 5 minutes
  CACHE_TIME_MS: 1000 * 60 * 30, // 30 minutes
};
