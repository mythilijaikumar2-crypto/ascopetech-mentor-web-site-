import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInterviewStore } from "../../store/interviewStore";
import { interviewService } from "../../services/interviewService";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Clock, Play, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export const InterviewSession: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { activeSession, currentQuestionIndex, submitAnswer, nextQuestion, prevQuestion, completeSession } = useInterviewStore();
  
  const [answer, setAnswer] = useState("");
  const [timer, setTimer] = useState(120); // 120 seconds (2 mins) per question
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  const navigate = useNavigate();

  // Active session validation
  useEffect(() => {
    if (!activeSession || activeSession.sessionId !== sessionId) {
      navigate("/candidate/interviews");
    }
  }, [activeSession, sessionId, navigate]);

  // Load answer text if already pre-filled
  useEffect(() => {
    if (activeSession) {
      const q = activeSession.questions[currentQuestionIndex];
      setAnswer(q.submittedAnswer || "");
      setTimer(120); // Reset timer for new question
    }
  }, [currentQuestionIndex, activeSession]);

  // Countdown timer clock
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
    toast.warning("Time is up! Your current draft answer is being submitted.");
    handleAnswerSubmit();
  };

  const handleAnswerSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeSession) return;

    const question = activeSession.questions[currentQuestionIndex];
    setIsSubmitting(true);

    try {
      // Evaluate answer using mock interview grading service
      const evaluation = await interviewService.evaluateAnswer(question, answer);
      
      // Save answer details and grading to store
      submitAnswer(question.id, answer);
      
      // Mutate evaluation results directly in active session
      question.submittedAnswer = answer;
      question.score = evaluation.score;
      question.feedback = evaluation.feedback;

      setIsSubmitting(false);
      setAnswer("");

      const isLast = currentQuestionIndex === activeSession.questions.length - 1;
      if (isLast) {
        handleCompleteInterview();
      } else {
        nextQuestion();
      }
    } catch (err) {
      toast.error("Submission failed.");
      setIsSubmitting(false);
    }
  };

  const handleCompleteInterview = async () => {
    if (!activeSession) return;
    setIsFinished(true);
    setIsSubmitting(true);

    try {
      // Compile entire session metrics
      const report = await interviewService.generateFinalReport(activeSession.questions);
      completeSession(report);
      
      toast.success("Mock interview session completed!");
      navigate(`/candidate/interviews/report/${sessionId}`);
    } catch (err) {
      toast.error("Compilation failed.");
    } finally {
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
  
  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-2xl mx-auto py-6 flex flex-col gap-6">
      
      {/* Session Progress Header */}
      <div className="flex items-center justify-between bg-white border border-slate-200/80 p-4.5 rounded-2xl shadow-sm">
        <div className="flex flex-col gap-0.8">
          <h2 className="text-xs font-bold text-slate-800 tracking-tight leading-tight">{activeSession.roleTitle}</h2>
          <p className="text-[10px] text-slate-400 font-semibold">{activeSession.difficulty} Difficulty</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="primary" className="text-[10px] font-bold">
            Question {currentIdxText(currentQuestionIndex, activeSession.questions.length)}
          </Badge>
          <Badge variant={timer <= 15 ? "danger" : "neutral"} className="inline-flex items-center gap-1.5 font-bold">
            <Clock className="h-3.5 w-3.5" />
            {formatTime(timer)}
          </Badge>
        </div>
      </div>

      {/* Console Card */}
      <Card className="p-8 border-slate-200 bg-white shadow-sm flex flex-col gap-6 min-h-[300px]">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Question Context</span>
          <h3 className="text-sm md:text-base font-bold text-slate-900 leading-snug tracking-tight text-balance">
            {question.question}
          </h3>
        </div>

        <form onSubmit={handleAnswerSubmit} className="flex flex-col gap-5 mt-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Compose Response</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Structure your answer clearly. Be sure to hit major keywords and explain components/architectures..."
              className="w-full h-48 p-4 bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:border-primary-500 focus:bg-white transition-all font-sans leading-relaxed"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-between items-center border-t border-slate-50 pt-4 mt-2">
            <Button
              variant="outline"
              disabled={currentQuestionIndex === 0 || isSubmitting}
              onClick={prevQuestion}
            >
              Previous
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              {currentQuestionIndex === activeSession.questions.length - 1 ? "Complete Interview" : "Submit Answer"}
            </Button>
          </div>
        </form>
      </Card>
      
    </div>
  );
};

// Index indicator helper
const currentIdxText = (current: number, total: number) => {
  return `${current + 1} OF ${total}`;
};
export default InterviewSession;
