import { useState, useCallback } from "react";
import { resumeService } from "../services/resumeService";
import { useResumeStore, AnalysisResult } from "../store/resumeStore";

export function useResumes() {
  const { resumes, selectedResumeId, addResume, updateResume, deleteResume, selectResume } = useResumeStore();
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeResume = useCallback(async (fileName: string, fileSize: number): Promise<AnalysisResult> => {
    try {
      setAnalyzing(true);
      setError(null);
      return await resumeService.analyzeResume(fileName, fileSize);
    } catch (err: any) {
      setError(err?.message || "Failed to analyze resume.");
      throw err;
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const compareWithJobDescription = useCallback(
    async (resumeText: string, jobDescription: string): Promise<AnalysisResult["jdMatch"]> => {
      try {
        setAnalyzing(true);
        setError(null);
        return await resumeService.compareWithJobDescription(resumeText, jobDescription);
      } catch (err: any) {
        setError(err?.message || "Failed to compare job description.");
        throw err;
      } finally {
        setAnalyzing(false);
      }
    },
    []
  );

  return {
    resumes,
    selectedResumeId,
    analyzing,
    error,
    addResume,
    updateResume,
    deleteResume,
    selectResume,
    analyzeResume,
    compareWithJobDescription
  };
}
