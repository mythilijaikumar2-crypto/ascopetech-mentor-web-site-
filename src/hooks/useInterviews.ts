import { useState, useCallback } from "react";
import { interviewService } from "../services/interviewService";
import { useInterviewStore } from "../store/interviewStore";
import { InterviewQuestion } from "../data/interviewQuestions";

export function useInterviews() {
  const { currentSession, pastSessions, startSession, addAnswer, completeSession, resetSession } = useInterviewStore();
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
      addAnswer(question.id, answer, res.score, res.feedback);
      return res;
    } catch (err: any) {
      setError(err?.message || "Failed to evaluate response.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [addAnswer]);

  const generateReport = useCallback(async () => {
    if (!currentSession) return;
    try {
      setLoading(true);
      setError(null);
      const report = await interviewService.generateFinalReport(currentSession.questions);
      completeSession(report);
      return report;
    } catch (err: any) {
      setError(err?.message || "Failed to generate interview report.");
      throw err;
    } finally {
      setLoading(false);
    }
  }, [currentSession, completeSession]);

  return {
    currentSession,
    pastSessions,
    loading,
    error,
    startSession,
    fetchQuestions,
    evaluateAnswer,
    generateReport,
    resetSession
  };
}
