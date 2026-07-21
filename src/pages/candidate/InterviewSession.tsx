import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInterviewStore } from "../../store/interviewStore";
import { AiService } from "../../services/api/aiService";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { AiThinkingAnimation } from "../../components/animations/AiThinkingAnimation";
import { Clock, Play, AlertTriangle, Mic, Code, FileCode, CheckCircle2 } from "lucide-react";

export const InterviewSession: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { activeSession, currentQuestionIndex, submitAnswer, nextQuestion, prevQuestion, completeSession } = useInterviewStore();
  
  const [answer, setAnswer] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [activeTab, setActiveTab] = useState<"text" | "code">("text");
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(120);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeSession || activeSession.sessionId !== sessionId) {
      navigate("/candidate/interviews");
    }
  }, [activeSession, sessionId, navigate]);

  useEffect(() => {
    if (activeSession) {
      const q = activeSession.questions[currentQuestionIndex];
      setAnswer(q.submittedAnswer || "");
      setTimer(120);
    }
  }, [currentQuestionIndex, activeSession]);

  useEffect(() => {
    if (isFinished || isSubmitting) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex, isFinished, isSubmitting]);

  const handleTimeOut = () => {
    handleAnswerSubmit();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setAnswer((prev) => prev + (prev ? " " : "") + "[Simulated voice transcript: In React, component reconciliation batches state changes efficiently using VDOM diffing.]");
    }
  };

  const handleAnswerSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeSession) return;

    const question = activeSession.questions[currentQuestionIndex];
    setIsSubmitting(true);

    const fullResponse = answer + (codeSnippet ? `\n\nCode Implementation:\n\`\`\`ts\n${codeSnippet}\n\`\`\`` : "");

    try {
      const evalRes = await AiService.evaluateInterviewAnswer(question.question, fullResponse, activeSession.roleTitle);
      submitAnswer(question.id, fullResponse);
      
      question.submittedAnswer = fullResponse;
      question.score = evalRes.score;
      question.feedback = evalRes.feedback;

      setIsSubmitting(false);
      setAnswer("");
      setCodeSnippet("");

      const isLast = currentQuestionIndex === activeSession.questions.length - 1;
      if (isLast) {
        handleCompleteInterview();
      } else {
        nextQuestion();
      }
    } catch {
      setIsSubmitting(false);
    }
  };

  const handleCompleteInterview = async () => {
    if (!activeSession) return;
    setIsFinished(true);
    setIsSubmitting(true);

    try {
      const finalReport = {
        sessionId: activeSession.sessionId,
        roleTitle: activeSession.roleTitle,
        overallScore: Math.round(activeSession.questions.reduce((acc, q) => acc + (q.score || 80), 0) / activeSession.questions.length),
        summary: "Excellent overall technical presentation with strong conceptual accuracy.",
        strengths: ["Strong technical definitions", "Concise architecture explanations"],
        improvements: ["Deepen discussion on real DOM reflow implications"],
        evaluatedAt: new Date().toLocaleDateString()
      };
      completeSession(finalReport);
      navigate(`/candidate/interviews/report/${sessionId}`);
    } catch {
      setIsSubmitting(false);
    }
  };

  if (!activeSession) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-400">Loading interview console...</p>
      </div>
    );
  }

  const question = activeSession.questions[currentQuestionIndex];
  
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-3xl mx-auto py-6 flex flex-col gap-6">
      {/* Session Progress Header */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4.5 rounded-2xl shadow-xs">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight">{activeSession.roleTitle}</h2>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{activeSession.difficulty} Difficulty</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="primary" className="text-[10px] font-bold">
            Question {currentQuestionIndex + 1} OF {activeSession.questions.length}
          </Badge>
          <Badge variant={timer <= 15 ? "danger" : "neutral"} className="inline-flex items-center gap-1.5 font-bold">
            <Clock className="h-3.5 w-3.5" />
            {formatTime(timer)}
          </Badge>
        </div>
      </div>

      {/* Console Card */}
      <Card className="p-8 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Interview Question</span>
          <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug tracking-tight text-balance">
            {question.question}
          </h3>
        </div>

        {/* Answer Compose Area */}
        <form onSubmit={handleAnswerSubmit} className="flex flex-col gap-5 mt-2">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("text")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "text"
                    ? "bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Text Answer
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "code"
                    ? "bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                Code Snippet (Optional)
              </button>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={toggleRecording}
              className={`text-xs ${isRecording ? "text-rose-500 border-rose-200 bg-rose-50 dark:bg-rose-950/40 animate-pulse" : ""}`}
              leftIcon={<Mic className="h-3.5 w-3.5" />}
            >
              {isRecording ? "Stop Recording" : "Voice Input"}
            </Button>
          </div>

          {activeTab === "text" ? (
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Structure your response clearly. Be sure to hit major keywords and explain components/architectures..."
              className="w-full h-44 p-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs focus:outline-none focus:border-primary-500 transition-colors font-sans leading-relaxed"
              required
              disabled={isSubmitting}
            />
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono text-slate-400">// TypeScript / JavaScript Code Sandbox</span>
              <textarea
                value={codeSnippet}
                onChange={(e) => setCodeSnippet(e.target.value)}
                placeholder="function solution() {\n  // Write your code implementation here\n}"
                className="w-full h-44 p-4 bg-slate-950 text-emerald-400 border border-slate-800 rounded-2xl text-xs font-mono focus:outline-none focus:border-primary-500 transition-colors leading-relaxed"
                disabled={isSubmitting}
              />
            </div>
          )}

          {isSubmitting && (
            <AiThinkingAnimation label="AI grading your technical explanation..." />
          )}

          <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4 mt-2">
            <Button
              variant="outline"
              disabled={currentQuestionIndex === 0 || isSubmitting}
              onClick={prevQuestion}
              type="button"
            >
              Previous
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              {currentQuestionIndex === activeSession.questions.length - 1 ? "Complete Session" : "Next Question"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InterviewSession;
