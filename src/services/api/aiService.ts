import { ApiClient } from "./apiClient";

export interface AtsAnalysisResult {
  atsScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
  strengths: string[];
  formatScore: number;
}

export interface InterviewEvaluationResult {
  score: number;
  feedback: string;
  keyStrengths: string[];
  improvements: string[];
  suggestedAnswer: string;
}

export class AiService {
  /**
   * Analyze resume against target role with simulated AI engine
   */
  public static async analyzeResume(resumeText: string, jobRole: string): Promise<AtsAnalysisResult> {
    const mockResult: AtsAnalysisResult = {
      atsScore: Math.floor(Math.random() * 20) + 75, // 75-95
      matchedKeywords: ["React.js", "TypeScript", "Tailwind CSS", "REST APIs", "State Management", "Git"],
      missingKeywords: ["GraphQL", "Docker", "CI/CD Pipelines", "Jest/Cypress Testing", "Web Vitals"],
      recommendations: [
        "Include metrics on performance improvements (e.g. 'Improved LCP by 35%').",
        "Add explicit testing frameworks like Vitest or Cypress.",
        "Emphasize responsive layout optimization and Tailwind CSS experience."
      ],
      strengths: [
        "Clean structural layout with clear section headers.",
        "Strong use of active technical verbs in project bullet points.",
        "Consistent typography and standard contact info formatting."
      ],
      formatScore: 92,
    };

    const res = await ApiClient.post("/api/ai/resume-analyze", { resumeText, jobRole }, mockResult);
    return res.data;
  }

  /**
   * Evaluate mock interview response
   */
  public static async evaluateInterviewAnswer(
    question: string,
    candidateAnswer: string,
    role: string
  ): Promise<InterviewEvaluationResult> {
    const mockResult: InterviewEvaluationResult = {
      score: Math.floor(Math.random() * 15) + 80, // 80-95
      feedback: "Great structured response! You hit key concepts such as virtual diffing, batching, and state reconciliation clearly.",
      keyStrengths: ["Concise explanation", "Accurate technical definitions", "Good flow"],
      improvements: [
        "Mention real DOM reflow/repaint implications.",
        "Reference React 18 concurrent rendering features."
      ],
      suggestedAnswer:
        "The Virtual DOM is an in-memory representation of the real DOM. When state changes occur, React performs a diffing algorithm between the new and old VDOM structures to batch DOM updates efficiently, avoiding expensive real DOM reflows.",
    };

    const res = await ApiClient.post("/api/ai/evaluate-interview", { question, candidateAnswer, role }, mockResult);
    return res.data;
  }

  /**
   * Stream AI mentor chatbot response
   */
  public static streamChatResponse(userQuery: string, onToken: (token: string) => void): Promise<string> {
    return new Promise((resolve) => {
      const fullResponse =
        `Great question regarding "${userQuery}"! To master this effectively, I recommend focusing on three key milestones:\n\n` +
        `1. **Core Fundamentals**: Ensure deep understanding of data structures, async patterns, and modern state flow.\n` +
        `2. **Production Architecture**: Build clean components using modular UI practices and proper TypeScript interfaces.\n` +
        `3. **Performance Optimization**: Learn Core Web Vitals (LCP, INP) and lazy-loading techniques.\n\n` +
        `Would you like me to generate a step-by-step 4-week study plan for this topic?`;

      let accum = "";
      const tokens = fullResponse.split(" ");
      let idx = 0;

      const interval = setInterval(() => {
        if (idx < tokens.length) {
          const t = tokens[idx] + " ";
          accum += t;
          onToken(t);
          idx++;
        } else {
          clearInterval(interval);
          resolve(accum);
        }
      }, 40);
    });
  }
}

export const aiService = AiService;
