import { useState, useEffect, useCallback } from "react";
import { careerService, CareerRecommendation } from "../services/careerService";
import { CareerPath } from "../data/careers";

export function useCareers() {
  const [careers, setCareers] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCareers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await careerService.getCareers();
      setCareers(data);
    } catch (err: any) {
      setError(err?.message || "Failed to load career paths.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCareers();
  }, [fetchCareers]);

  const getCareerById = useCallback(async (id: string): Promise<CareerPath | undefined> => {
    return await careerService.getCareerById(id);
  }, []);

  const analyzeAssessment = useCallback(async (answers: Record<string, any>): Promise<CareerRecommendation[]> => {
    return await careerService.analyzeAssessment(answers);
  }, []);

  return {
    careers,
    loading,
    error,
    refetch: fetchCareers,
    getCareerById,
    analyzeAssessment
  };
}
