import { useState, useCallback } from "react";
import { roadmapService } from "../services/roadmapService";
import { useRoadmapStore } from "../store/roadmapStore";

export function useRoadmap() {
  const { activeRoadmap, completedTasks, loadRoadmap: setRoadmapStore, toggleTaskCompleted, resetProgress } = useRoadmapStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRoadmap = useCallback(async (careerId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await roadmapService.generateRoadmap(careerId);
      setRoadmapStore(careerId);
      return data;
    } catch (err: any) {
      setError(err?.message || "Failed to load roadmap.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setRoadmapStore]);

  return {
    activeRoadmap,
    completedTasks,
    loading,
    error,
    fetchRoadmap,
    toggleTaskCompleted,
    resetProgress
  };
}
