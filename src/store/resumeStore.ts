import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ResumeExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface ResumeEducation {
  id: string;
  school: string;
  degree: string;
  field: string;
  graduationYear: string;
}

export interface ResumeProject {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface Resume {
  id: string;
  title: string;
  template: "classic" | "modern" | "creative";
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
  };
  objective: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: string[];
  certifications: string[];
  projects: ResumeProject[];
  achievements: string[];
  languages: string[];
  score: number; // ATS score
  updatedAt: string;
}

export interface AnalysisResult {
  score: number;
  atsScore: number;
  completeness: number;
  formattingIssues: string[];
  missingSections: string[];
  strongPoints: string[];
  recommendations: string[];
  jdMatch?: {
    matchPercentage: number;
    matchingSkills: string[];
    missingSkills: string[];
    suggestions: string[];
  };
}

interface ResumeState {
  resumes: Resume[];
  selectedResumeId: string | null;
  analysisResults: Record<string, AnalysisResult>; // keyed by resumeId
  addResume: (resume: Resume) => void;
  updateResume: (resumeId: string, updated: Partial<Resume>) => void;
  deleteResume: (resumeId: string) => void;
  duplicateResume: (resumeId: string) => void;
  selectResume: (resumeId: string | null) => void;
  saveAnalysisResult: (resumeId: string, result: AnalysisResult) => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resumes: [],
      selectedResumeId: null,
      analysisResults: {},
      addResume: (resume) => {
        set((state) => ({ resumes: [resume, ...state.resumes], selectedResumeId: resume.id }));
      },
      updateResume: (resumeId, updated) => {
        set((state) => ({
          resumes: state.resumes.map((r) =>
            r.id === resumeId ? { ...r, ...updated, updatedAt: new Date().toLocaleDateString() } : r
          ),
        }));
      },
      deleteResume: (resumeId) => {
        set((state) => ({
          resumes: state.resumes.filter((r) => r.id !== resumeId),
          selectedResumeId: state.selectedResumeId === resumeId ? null : state.selectedResumeId,
        }));
      },
      duplicateResume: (resumeId) => {
        set((state) => {
          const original = state.resumes.find((r) => r.id === resumeId);
          if (!original) return {};
          const duplicate: Resume = {
            ...original,
            id: `res-${Math.random().toString(36).substr(2, 9)}`,
            title: `${original.title} (Copy)`,
            updatedAt: new Date().toLocaleDateString(),
          };
          return { resumes: [duplicate, ...state.resumes] };
        });
      },
      selectResume: (resumeId) => {
        set({ selectedResumeId: resumeId });
      },
      saveAnalysisResult: (resumeId, result) => {
        set((state) => ({
          analysisResults: {
            ...state.analysisResults,
            [resumeId]: result,
          },
        }));
      },
    }),
    {
      name: "career_ai_resumes",
    }
  )
);
