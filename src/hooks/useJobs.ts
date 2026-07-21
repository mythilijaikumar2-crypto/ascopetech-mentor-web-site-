import { useState, useEffect, useCallback } from "react";
import { jobService } from "../services/jobService";
import { useJobStore, JobApplication } from "../store/jobStore";
import { Job } from "../data/jobs";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { savedJobIds, saveJob, unsaveJob, applyToJob, applications } = useJobStore();

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await jobService.fetchJobs();
      setJobs(data);
    } catch (err: any) {
      setError(err?.message || "Failed to load job listings.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const getJobById = useCallback(async (id: string): Promise<Job | undefined> => {
    return await jobService.getJobById(id);
  }, []);

  const submitApplication = useCallback(
    async (jobId: string, resumeId: string, resumeTitle: string, coverNote: string): Promise<JobApplication> => {
      const application = await jobService.submitApplication(jobId, resumeId, resumeTitle, coverNote);
      applyToJob(application);
      return application;
    },
    [applyToJob]
  );

  return {
    jobs,
    loading,
    error,
    savedJobIds,
    applications,
    saveJob,
    unsaveJob,
    getJobById,
    submitApplication,
    refetch: fetchJobs
  };
}
