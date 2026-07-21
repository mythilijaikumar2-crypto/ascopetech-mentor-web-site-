import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jobService } from "../services/jobService";
import { useJobStore, JobApplication } from "../store/jobStore";
import { Job } from "../data/jobs";

export const JOBS_QUERY_KEY = ["jobs"];

export function useJobsQuery() {
  const queryClient = useQueryClient();
  const { savedJobIds, saveJob, unsaveJob, applyToJob, applications } = useJobStore();

  const jobsQuery = useQuery<Job[]>({
    queryKey: JOBS_QUERY_KEY,
    queryFn: () => jobService.fetchJobs(),
  });

  const applyMutation = useMutation<
    JobApplication,
    Error,
    { jobId: string; resumeId: string; resumeTitle: string; coverNote: string },
    { previousJobs?: Job[] }
  >({
    mutationFn: ({ jobId, resumeId, resumeTitle, coverNote }) =>
      jobService.submitApplication(jobId, resumeId, resumeTitle, coverNote),
    onMutate: async (newApp) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: JOBS_QUERY_KEY });
      const previousJobs = queryClient.getQueryData<Job[]>(JOBS_QUERY_KEY);
      
      applyToJob({
        id: `opt-${Date.now()}`,
        jobId: newApp.jobId,
        jobTitle: "Applying...",
        company: "Company",
        resumeId: newApp.resumeId,
        resumeTitle: newApp.resumeTitle,
        coverNote: newApp.coverNote,
        status: "Applied",
        appliedDate: new Date().toLocaleDateString(),
      });

      return { previousJobs };
    },
    onSuccess: (realApp) => {
      applyToJob(realApp);
      queryClient.invalidateQueries({ queryKey: JOBS_QUERY_KEY });
    },
  });

  return {
    jobs: jobsQuery.data || [],
    isLoading: jobsQuery.isLoading,
    isError: jobsQuery.isError,
    error: jobsQuery.error,
    savedJobIds,
    applications,
    saveJob,
    unsaveJob,
    submitApplication: applyMutation.mutateAsync,
    isApplying: applyMutation.isPending,
    refetch: jobsQuery.refetch,
  };
}
