import { mockInterviewQuestions, InterviewQuestion } from "../data/interviewQuestions";
import { ActiveQuestion, InterviewSession } from "../store/interviewStore";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const interviewService = {
  getQuestionsForRole: async (
    roleId: string,
    count: number = 3
  ): Promise<InterviewQuestion[]> => {
    await delay(600);
    // Filter questions by role, fallback to generic frontend questions if none found
    let filtered = mockInterviewQuestions.filter((q) => q.roleId === roleId);
    if (filtered.length === 0) {
      filtered = mockInterviewQuestions.filter((q) => q.roleId === "frontend-developer");
    }
    return filtered.slice(0, count);
  },

  evaluateAnswer: async (
    question: InterviewQuestion,
    answer: string
  ): Promise<{ score: number; feedback: string }> => {
    await delay(1000); // Simulate AI response evaluation delay

    const ansLower = answer.toLowerCase();
    
    // Keyword scoring algorithm
    let matchedKeywords = 0;
    question.suggestedPoints.forEach((point) => {
      const keywords = point.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      const matches = keywords.filter(w => ansLower.includes(w));
      if (matches.length > 0) matchedKeywords++;
    });

    // Score based on keywords and length
    const keywordRatio = matchedKeywords / question.suggestedPoints.length;
    let score = Math.round(keywordRatio * 60) + 30; // base 30, max 90
    if (answer.trim().length > 120) score += 10; // length bonus
    score = Math.min(score, 100);

    let feedback = "";
    if (score >= 85) {
      feedback = "Outstanding response! You clearly understand the concept, hit all key technical details, and explained it coherently.";
    } else if (score >= 70) {
      feedback = "Good answer, but could be improved. You covered the core principles but missed some details, such as batching repaints or preloading formats.";
    } else {
      feedback = "Your answer is too brief or misses critical points. Be sure to detail the implementation, performance optimization steps, and use industry terminology.";
    }

    return { score, feedback };
  },

  generateFinalReport: async (questions: ActiveQuestion[]): Promise<Partial<InterviewSession>> => {
    await delay(1500); // Higher delay for generating final summary

    const totalScore = questions.reduce((sum, q) => sum + (q.score || 0), 0);
    const avgScore = Math.round(totalScore / questions.length) || 70;

    const relevanceScore = Math.min(avgScore + 2, 98);
    const clarityScore = Math.min(avgScore - 3, 95);
    const technicalAccuracy = Math.min(avgScore + 1, 97);

    return {
      score: avgScore,
      relevanceScore,
      clarityScore,
      technicalAccuracy,
      strengths: [
        "Strong understanding of core terminology and basic paradigms",
        "Clear explanations of process differences",
        "Quantifiable project milestones articulated well"
      ],
      improvements: [
        "Include more concrete performance metrics or file extensions in explanations",
        "Detail specific browser mechanisms (e.g. event loop ticks, repaint queues)",
        "Structure responses using the STAR method (Situation, Task, Action, Result)"
      ]
    };
  }
};
