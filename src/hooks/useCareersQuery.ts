import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { careerService, CareerRecommendation } from "../services/careerService";
import { CareerPath } from "../data/careers";

export const CAREERS_QUERY_KEY = ["careers"];

export function useCareersQuery() {
  const queryClient = useQueryClient();

  const careersQuery = useQuery<CareerPath[]>({
    queryKey: CAREERS_QUERY_KEY,
    queryFn: () => careerService.getCareers(),
  });

  const analyzeMutation = useMutation<CareerRecommendation[], Error, Record<string, any>>({
    mutationFn: (answers) => careerService.analyzeAssessment(answers),
    onSuccess: (recommendations) => {
      queryClient.setQueryData(["career_recommendations"], recommendations);
    },
  });

  return {
    careers: careersQuery.data || [],
    isLoading: careersQuery.isLoading,
    isError: careersQuery.isError,
    error: careersQuery.error,
    refetch: careersQuery.refetch,
    analyzeAssessment: analyzeMutation.mutateAsync,
    isAnalyzing: analyzeMutation.isPending,
  };
}
