import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  resumeId: string;
  resumeTitle: string;
  coverNote: string;
  status: "Applied" | "Under Review" | "Shortlisted" | "Interview Scheduled" | "Rejected" | "Selected";
  appliedDate: string;
}

interface JobState {
  savedJobIds: string[];
  applications: JobApplication[];
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  applyToJob: (application: JobApplication) => void;
  updateApplicationStatus: (
    applicationId: string,
    status: JobApplication["status"]
  ) => void;
}

export const useJobStore = create<JobState>()(
  persist(
    (set) => ({
      savedJobIds: [],
      applications: [],
      saveJob: (jobId) => {
        set((state) => ({
          savedJobIds: state.savedJobIds.includes(jobId)
            ? state.savedJobIds
            : [...state.savedJobIds, jobId],
        }));
      },
      unsaveJob: (jobId) => {
        set((state) => ({
          savedJobIds: state.savedJobIds.filter((id) => id !== jobId),
        }));
      },
      applyToJob: (application) => {
        set((state) => ({
          applications: [application, ...state.applications],
        }));
      },
      updateApplicationStatus: (applicationId, status) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === applicationId ? { ...app, status } : app
          ),
        }));
      },
    }),
    {
      name: "career_ai_jobs",
    }
  )
);
