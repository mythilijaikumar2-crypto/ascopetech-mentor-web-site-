export interface FeatureFlags {
  enableRealtimeWebsockets: boolean;
  enableSseAiStreaming: boolean;
  enableOptimisticUpdates: boolean;
  enableInfiniteScrolling: boolean;
  enableOfflineSync: boolean;
}

export const defaultFeatureFlags: FeatureFlags = {
  enableRealtimeWebsockets: true,
  enableSseAiStreaming: true,
  enableOptimisticUpdates: true,
  enableInfiniteScrolling: true,
  enableOfflineSync: true,
};
