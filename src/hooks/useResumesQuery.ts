import { useMutation } from "@tanstack/react-query";
import { resumeService } from "../services/resumeService";
import { useResumeStore, AnalysisResult } from "../store/resumeStore";

export function useResumesQuery() {
  const { resumes, activeResumeId, addResume, updateResume, deleteResume, setActiveResume } = useResumeStore();

  const analyzeMutation = useMutation<AnalysisResult, Error, { fileName: string; fileSize: number }>({
    mutationFn: ({ fileName, fileSize }) => resumeService.analyzeResume(fileName, fileSize),
  });

  const compareMutation = useMutation<
    AnalysisResult["jdMatch"],
    Error,
    { resumeText: string; jobDescription: string }
  >({
    mutationFn: ({ resumeText, jobDescription }) =>
      resumeService.compareWithJobDescription(resumeText, jobDescription),
  });

  return {
    resumes,
    activeResumeId,
    addResume,
    updateResume,
    deleteResume,
    setActiveResume,
    analyzeResume: analyzeMutation.mutateAsync,
    isAnalyzing: analyzeMutation.isPending,
    compareWithJobDescription: compareMutation.mutateAsync,
    isComparing: compareMutation.isPending,
  };
}
