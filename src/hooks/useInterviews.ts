import { useState, useCallback } from "react";
import { interviewService } from "../services/interviewService";
import { useInterviewStore } from "../store/interviewStore";
import { InterviewQuestion } from "../data/interviewQuestions";

export function useInterviews() {
  const { activeSession, sessions, startSession, submitAnswer, completeSession, resetActiveSession } = useInterviewStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async (roleId: string, count: number = 3): Promise<InterviewQuestion[]> => {
    try {
      setLoading(true);
      setError(null);
      return await interviewService.getQuestionsForRole(roleId, count);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch interview questions.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const evaluateAnswer = useCallback(async (question: InterviewQuestion, answer: string) => {
    try {
      setLoading(true);
      setError(null);
      const res = await interviewService.evaluateAnswer(question, answer);
      submitAnswer(question.id, answer);
      return res;
    } catch (err: any) {
      setError(err?.message || "Failed to evaluate response.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [submitAnswer]);

  const generateReport = useCallback(async () => {
    if (!activeSession) return;
    try {
      setLoading(true);
      setError(null);
      const report = await interviewService.generateFinalReport(activeSession.questions);
      completeSession(report);
      return report;
    } catch (err: any) {
      setError(err?.message || "Failed to generate interview report.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [activeSession, completeSession]);

  return {
    activeSession,
    sessions,
    loading,
    error,
    startSession,
    fetchQuestions,
    evaluateAnswer,
    generateReport,
    resetActiveSession
  };
}
