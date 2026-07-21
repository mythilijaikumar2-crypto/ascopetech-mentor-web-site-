import React, { useState, useEffect } from "react";
import { useResumeStore } from "../../store/resumeStore";
import { mockSkillQuizzes, SkillQuiz, QuizQuestion } from "../../data/skills";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { Award, Clock, BookOpen, CheckCircle2, XCircle, Play, HelpCircle, History } from "lucide-react";
import { toast } from "sonner";

interface QuizAttempt {
  quizId: string;
  quizName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  dateAttempted: string;
  passed: boolean;
}

export const Skills: React.FC = () => {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<SkillQuiz | null>(null);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Load attempt history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("career_ai_skill_quiz_attempts");
    if (saved) {
      setAttempts(JSON.parse(saved));
    }
  }, []);

  // Countdown timer clock
  useEffect(() => {
    if (!isQuizActive || quizFinished) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleQuizSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isQuizActive, quizFinished]);

  const handleStartQuiz = (quiz: SkillQuiz) => {
    setActiveQuiz(quiz);
    setCurrentQIdx(0);
    setSelectedAnswers({});
    setTimer(quiz.timeLimitMinutes * 60);
    setQuizFinished(false);
    setIsQuizActive(true);
    toast.success(`'${quiz.name}' skill quiz started! Time is ticking.`);
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleQuizSubmit = (timeOut: boolean = false) => {
    if (!activeQuiz) return;
    if (timeOut) {
      toast.warning("Time expired! Your quiz has been auto-submitted.");
    }

    setQuizFinished(true);

    // Calculate score
    let correctCount = 0;
    activeQuiz.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const pct = Math.round((correctCount / activeQuiz.questions.length) * 100);
    const passed = pct >= 70; // 70% passing threshold

    const newAttempt: QuizAttempt = {
      quizId: activeQuiz.id,
      quizName: activeQuiz.name,
      score: correctCount,
      totalQuestions: activeQuiz.questions.length,
      percentage: pct,
      dateAttempted: new Date().toLocaleDateString(),
      passed
    };

    const updatedAttempts = [newAttempt, ...attempts];
    setAttempts(updatedAttempts);
    localStorage.setItem("career_ai_skill_quiz_attempts", JSON.stringify(updatedAttempts));

    toast.success(`Quiz completed! Your score: ${pct}%. ${passed ? "You passed!" : "Please try again."}`);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="py-8 flex flex-col gap-10">
      
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-6">
        <Badge variant="primary" className="max-w-fit">SKILL ASSESSMENTS</Badge>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
          Verify Your Skill Competencies
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
          Take 5-10 minute timed multiple choice quizzes in front-end technologies to verify your proficiency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Quizzes Grid */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Available Quizzes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mockSkillQuizzes.map((quiz) => (
              <Card key={quiz.id} className="p-6 border-slate-200 bg-white shadow-sm flex flex-col justify-between min-h-[180px]">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <Badge variant="primary" size="sm">{quiz.category}</Badge>
                    <span className="text-[10px] text-slate-400 font-semibold inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {quiz.timeLimitMinutes} mins
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 tracking-tight leading-tight">{quiz.name}</h4>
                  <p className="text-[10px] text-slate-450">{quiz.questions.length} Scenario Questions</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full justify-center mt-5"
                  leftIcon={<Play className="h-4 w-4" />}
                  onClick={() => handleStartQuiz(quiz)}
                >
                  Start Quiz
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Side: Attempt History Log */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Attempt History</h3>
          {attempts.length === 0 ? (
            <Card className="p-8 text-center border-slate-200 bg-white shadow-sm text-xs text-slate-400 font-medium flex flex-col gap-2 items-center">
              <History className="h-8 w-8 text-slate-300" />
              <span>No quizzes completed yet.</span>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {attempts.map((att, i) => (
                <Card key={i} className="p-4 border-slate-150 bg-white shadow-sm flex items-center justify-between">
                  <div className="flex flex-col gap-0.8">
                    <h5 className="text-xs font-bold text-slate-800 leading-tight">{att.quizName}</h5>
                    <span className="text-[9px] text-slate-400 font-medium">Attempted: {att.dateAttempted}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-extrabold text-slate-700">{att.percentage}%</span>
                    <Badge variant={att.passed ? "success" : "danger"} className="text-[8px] py-0 px-2 uppercase font-extrabold tracking-wide">
                      {att.passed ? "PASS" : "FAIL"}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Timed Quiz Session Modal */}
      <Modal
        isOpen={isQuizActive}
        onClose={() => {
          if (confirm("Are you sure you want to exit the quiz? Your current progress will be lost.")) {
            setIsQuizActive(false);
            setActiveQuiz(null);
          }
        }}
        title={activeQuiz ? `${activeQuiz.name} Console` : "Quiz Console"}
        size="2xl"
      >
        {activeQuiz && (
          <div className="flex flex-col gap-6">
            
            {/* Quiz Progress header */}
            {!quizFinished ? (
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 text-xs">
                <span className="font-semibold text-slate-400">
                  Question {currentQIdx + 1} of {activeQuiz.questions.length}
                </span>
                <Badge variant={timer <= 30 ? "danger" : "neutral"} className="inline-flex items-center gap-1.5 font-bold">
                  <Clock className="h-4 w-4" /> {formatTime(timer)}
                </Badge>
              </div>
            ) : (
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 text-xs">
                <span className="font-bold text-slate-700">Quiz Completed Evaluation</span>
                <Badge variant="primary" className="font-extrabold text-xs">
                  Passing threshold: 70%
                </Badge>
              </div>
            )}

            {/* Live quiz execution */}
            {!quizFinished ? (
              <div className="flex flex-col gap-5 py-2">
                <h3 className="text-sm font-bold text-slate-800 leading-snug">
                  {activeQuiz.questions[currentQIdx].question}
                </h3>
                <div className="flex flex-col gap-3">
                  {activeQuiz.questions[currentQIdx].options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[activeQuiz.questions[currentQIdx].id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(activeQuiz.questions[currentQIdx].id, optIdx)}
                        className={`w-full p-4 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between group ${
                          isSelected
                            ? "bg-primary-50 border-primary-500 text-primary-700 shadow-sm"
                            : "bg-slate-50/50 border-slate-150 hover:bg-slate-50 text-slate-655"
                        }`}
                      >
                        <span>{opt}</span>
                        <span className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center text-[10px] shrink-0 ml-3 ${
                          isSelected ? "border-primary-500 bg-primary-500 text-white" : "border-slate-300"
                        }`}>
                          {isSelected && "✓"}
                        </span>
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex justify-between border-t border-slate-100 pt-4 mt-2">
                  <Button
                    variant="outline"
                    disabled={currentQIdx === 0}
                    onClick={() => setCurrentQIdx(currentQIdx - 1)}
                  >
                    Previous
                  </Button>
                  {currentQIdx < activeQuiz.questions.length - 1 ? (
                    <Button
                      variant="primary"
                      onClick={() => setCurrentQIdx(currentQIdx + 1)}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleQuizSubmit()}
                    >
                      Submit Quiz
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              // Quiz Finished: Detailed score review & explanations
              <div className="flex flex-col gap-6 py-2">
                <div className="text-center p-6 bg-slate-50 border border-slate-100 rounded-2xl max-w-sm mx-auto flex flex-col gap-3.5 items-center">
                  <Award className="h-10 w-10 text-primary-600 animate-bounce" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Your Quiz Results</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Correct Answers: {attempts[0]?.score} of {attempts[0]?.totalQuestions} ({attempts[0]?.percentage}%)
                    </p>
                  </div>
                  <Badge variant={attempts[0]?.passed ? "success" : "danger"} className="font-extrabold text-[10px]">
                    {attempts[0]?.passed ? "PROFICIENT (PASS)" : "NEEDS PRACTICE (FAIL)"}
                  </Badge>
                </div>

                <div className="flex flex-col gap-5 border-t border-slate-100 pt-5">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Question Explanations</h4>
                  <div className="flex flex-col gap-4">
                    {activeQuiz.questions.map((q, idx) => {
                      const userAnsIdx = selectedAnswers[q.id];
                      const isCorrect = userAnsIdx === q.correctOptionIndex;
                      return (
                        <div key={q.id} className="flex flex-col gap-3 p-4 border border-slate-150 rounded-xl bg-white shadow-sm">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-bold text-slate-400">QUESTION {idx + 1}</span>
                            {isCorrect ? (
                              <Badge variant="success" className="text-[8px] inline-flex items-center gap-1 font-bold">
                                <CheckCircle2 className="h-3 w-3" /> Correct
                              </Badge>
                            ) : (
                              <Badge variant="danger" className="text-[8px] inline-flex items-center gap-1 font-bold">
                                <XCircle className="h-3 w-3" /> Incorrect
                              </Badge>
                            )}
                          </div>
                          <h5 className="text-xs font-bold text-slate-800 leading-snug">{q.question}</h5>
                          <p className="text-[11px] text-slate-550 mt-1 leading-relaxed">
                            <strong>Your Answer:</strong> {q.options[userAnsIdx] || "Not answered"}
                          </p>
                          <p className="text-[11px] text-slate-555 leading-relaxed">
                            <strong>Correct Answer:</strong> {q.options[q.correctOptionIndex]}
                          </p>
                          <p className="text-[11px] text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100/60 mt-1">
                            <strong>Explanation:</strong> {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end border-t border-slate-100 pt-4 mt-2">
                  <Button variant="primary" onClick={() => setIsQuizActive(false)}>
                    Close Review Console
                  </Button>
                </div>
              </div>
            )}

          </div>
        )}
      </Modal>

    </div>
  );
};
export default Skills;
