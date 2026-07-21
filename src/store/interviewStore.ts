import { create } from "zustand";
import { persist } from "zustand/middleware";
import { InterviewQuestion } from "../data/interviewQuestions";

export interface ActiveQuestion extends InterviewQuestion {
  submittedAnswer?: string;
  score?: number; // 0 - 100
  feedback?: string;
}

export interface InterviewSession {
  sessionId: string;
  roleId: string;
  roleTitle: string;
  difficulty: "Entry" | "Mid" | "Senior";
  focus: "Technical" | "Behavioral" | "Mixed";
  questions: ActiveQuestion[];
  isCompleted: boolean;
  score?: number; // average score
  relevanceScore?: number;
  clarityScore?: number;
  technicalAccuracy?: number;
  strengths?: string[];
  improvements?: string[];
  dateCompleted?: string;
}

interface InterviewState {
  sessions: InterviewSession[];
  activeSession: InterviewSession | null;
  startSession: (session: InterviewSession) => void;
  submitAnswer: (questionId: string, answer: string) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  currentQuestionIndex: number;
  completeSession: (reportData: Partial<InterviewSession>) => void;
  resetActiveSession: () => void;
}

export const useInterviewStore = create<InterviewState>()(
  persist(
    (set) => ({
      sessions: [],
      activeSession: null,
      currentQuestionIndex: 0,
      startSession: (session) => {
        set({ activeSession: session, currentQuestionIndex: 0 });
      },
      submitAnswer: (questionId, answer) => {
        set((state) => {
          if (!state.activeSession) return {};
          const questions = state.activeSession.questions.map((q) =>
            q.id === questionId ? { ...q, submittedAnswer: answer } : q
          );
          return { activeSession: { ...state.activeSession, questions } };
        });
      },
      nextQuestion: () => {
        set((state) => {
          if (!state.activeSession) return {};
          const nextIndex = state.currentQuestionIndex + 1;
          if (nextIndex < state.activeSession.questions.length) {
            return { currentQuestionIndex: nextIndex };
          }
          return {};
        });
      },
      prevQuestion: () => {
        set((state) => {
          const prevIndex = state.currentQuestionIndex - 1;
          if (prevIndex >= 0) {
            return { currentQuestionIndex: prevIndex };
          }
          return {};
        });
      },
      completeSession: (reportData) => {
        set((state) => {
          if (!state.activeSession) return {};
          const completed: InterviewSession = {
            ...state.activeSession,
            ...reportData,
            isCompleted: true,
            dateCompleted: new Date().toLocaleDateString(),
          };
          return {
            sessions: [completed, ...state.sessions],
            activeSession: completed,
          };
        });
      },
      resetActiveSession: () => {
        set({ activeSession: null, currentQuestionIndex: 0 });
      },
    }),
    {
      name: "career_ai_interviews",
    }
  )
);
