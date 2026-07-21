import { defaultFeatureFlags, FeatureFlags } from "../config/featureFlags";

export function useFeatureFlags(): FeatureFlags {
  return defaultFeatureFlags;
}
