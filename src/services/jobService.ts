import { mockJobs, Job } from "../data/jobs";
import { JobApplication } from "../store/jobStore";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const jobService = {
  fetchJobs: async (): Promise<Job[]> => {
    await delay(500);
    return mockJobs;
  },

  getJobById: async (id: string): Promise<Job | undefined> => {
    await delay(300);
    return mockJobs.find((j) => j.id === id);
  },

  submitApplication: async (
    jobId: string,
    resumeId: string,
    resumeTitle: string,
    coverNote: string
  ): Promise<JobApplication> => {
    await delay(1200);

    const job = mockJobs.find((j) => j.id === jobId);
    if (!job) throw new Error("Job not found");

    return {
      id: `app-${Math.random().toString(36).substr(2, 9)}`,
      jobId,
      jobTitle: job.title,
      company: job.company,
      resumeId,
      resumeTitle,
      coverNote,
      status: "Applied",
      appliedDate: new Date().toLocaleDateString()
    };
  }
};
