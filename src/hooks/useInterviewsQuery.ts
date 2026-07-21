import { useQuery, useMutation } from "@tanstack/react-query";
import { interviewService } from "../services/interviewService";
import { useInterviewStore } from "../store/interviewStore";
import { InterviewQuestion } from "../data/interviewQuestions";

export function useInterviewsQuery(roleId?: string) {
  const { currentSession, pastSessions, startSession, addAnswer, completeSession, resetSession } = useInterviewStore();

  const questionsQuery = useQuery<InterviewQuestion[]>({
    queryKey: ["interview_questions", roleId],
    queryFn: () => interviewService.getQuestionsForRole(roleId || "frontend-developer", 3),
    enabled: !!roleId,
  });

  const evaluateMutation = useMutation<
    { score: number; feedback: string },
    Error,
    { question: InterviewQuestion; answer: string }
  >({
    mutationFn: ({ question, answer }) => interviewService.evaluateAnswer(question, answer),
    onSuccess: (res, variables) => {
      addAnswer(variables.question.id, variables.answer, res.score, res.feedback);
    },
  });

  const reportMutation = useMutation({
    mutationFn: async () => {
      if (!currentSession) throw new Error("No active session");
      return await interviewService.generateFinalReport(currentSession.questions);
    },
    onSuccess: (report) => {
      completeSession(report);
    },
  });

  return {
    questions: questionsQuery.data || [],
    isLoadingQuestions: questionsQuery.isLoading,
    currentSession,
    pastSessions,
    startSession,
    evaluateAnswer: evaluateMutation.mutateAsync,
    isEvaluating: evaluateMutation.isPending,
    generateReport: reportMutation.mutateAsync,
    isGeneratingReport: reportMutation.isPending,
    resetSession,
  };
}
