import { useQuery } from "@tanstack/react-query";
import { roadmapService } from "../services/roadmapService";
import { useRoadmapStore } from "../store/roadmapStore";
import { CareerRoadmap } from "../data/roadmap";

export function useRoadmapQuery(careerId: string) {
  const { activeRoadmap, completedTasks, loadRoadmap: setRoadmapStore, toggleTaskCompleted, resetProgress } = useRoadmapStore();

  const roadmapQuery = useQuery<CareerRoadmap>({
    queryKey: ["roadmap", careerId],
    queryFn: async () => {
      const res = await roadmapService.generateRoadmap(careerId);
      setRoadmapStore(careerId);
      return res;
    },
    enabled: !!careerId,
  });

  return {
    roadmap: roadmapQuery.data || activeRoadmap,
    completedTasks,
    isLoading: roadmapQuery.isLoading,
    isError: roadmapQuery.isError,
    refetch: roadmapQuery.refetch,
    toggleTaskCompleted,
    resetProgress,
  };
}
