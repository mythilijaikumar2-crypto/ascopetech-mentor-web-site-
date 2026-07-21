import React, { useState, useEffect } from "react";
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { mockAssessmentQuestions } from "../../data/assessments";
import { careerService } from "../../services/careerService";
import { useProfileStore } from "../../store/profileStore";
import { ArrowLeft, ArrowRight, ClipboardList, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Assessment: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const { setOnboarding } = useProfileStore();
  const navigate = useNavigate();

  // Load answers from localStorage on mount
  useEffect(() => {
    const savedAnswers = localStorage.getItem("career_ai_assessment_answers");
    const savedIdx = localStorage.getItem("career_ai_assessment_idx");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
    if (savedIdx) {
      setCurrentIdx(Number(savedIdx));
    }
  }, []);

  // Save progress on answer change
  const saveProgress = (newAnswers: Record<string, any>, newIdx: number) => {
    setAnswers(newAnswers);
    setCurrentIdx(newIdx);
    localStorage.setItem("career_ai_assessment_answers", JSON.stringify(newAnswers));
    localStorage.setItem("career_ai_assessment_idx", String(newIdx));
  };

  const handleSelectOption = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    saveProgress(newAnswers, currentIdx);
  };

  const handleRatingChange = (questionId: string, rating: number) => {
    const newAnswers = { ...answers, [questionId]: rating };
    saveProgress(newAnswers, currentIdx);
  };

  const handleNext = () => {
    const currentQuestion = mockAssessmentQuestions[currentIdx];
    if (answers[currentQuestion.id] === undefined) {
      toast.error("Please answer the current question before continuing.");
      return;
    }

    if (currentIdx < mockAssessmentQuestions.length - 1) {
      saveProgress(answers, currentIdx + 1);
    }
  };

  const handleBack = () => {
    if (currentIdx > 0) {
      saveProgress(answers, currentIdx - 1);
    }
  };

  const handleSubmit = async () => {
    const currentQuestion = mockAssessmentQuestions[currentIdx];
    if (answers[currentQuestion.id] === undefined) {
      toast.error("Please answer the current question.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisStep(1);

    // Simulated staggered analysis phases
    setTimeout(() => {
      setAnalysisStep(2);
      setTimeout(() => {
        setAnalysisStep(3);
        setTimeout(async () => {
          // Grade the quiz using careerService
          const recommendations = await careerService.analyzeAssessment(answers);
          
          // Save recommended paths inside localStorage / profileStore
          localStorage.setItem("career_ai_recommendations", JSON.stringify(recommendations));
          
          // Clear temp assessment cache
          localStorage.removeItem("career_ai_assessment_answers");
          localStorage.removeItem("career_ai_assessment_idx");

          // Save to profile store
          setOnboarding({ onboardingCompleted: true });

          toast.success("Profile assessment complete! Match results are ready.");
          setIsAnalyzing(false);
          navigate("/candidate/assessment/result");
        }, 1200);
      }, 1000);
    }, 1000);
  };

  const currentQuestion = mockAssessmentQuestions[currentIdx];
  const progressPercent = Math.round(((currentIdx + 1) / mockAssessmentQuestions.length) * 100);

  if (isAnalyzing) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-sm flex flex-col items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 animate-bounce">
            <ClipboardList className="h-7 w-7" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-slate-800">Analyzing responses</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              {analysisStep === 1 && "Evaluating situational work styles..."}
              {analysisStep === 2 && "Scanning skill level coefficients..."}
              {analysisStep === 3 && "Calculating matching career opportunities..."}
            </p>
          </div>
          {/* Progress bar */}
          <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
            <m.div
              initial={{ width: "0%" }}
              animate={{ width: `${analysisStep * 33}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-0 bottom-0 bg-primary-600 rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 flex flex-col gap-6">
      {/* Assessment Header progress */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-400">CAREER ASSESSMENT</span>
          <span className="font-bold text-primary-650">{progressPercent}% COMPLETE</span>
        </div>
        <div className="w-full h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
          <m.div
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-primary-600 rounded-full"
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-8 border-slate-200/80 bg-white shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-2 text-slate-400">
          <Badge variant="primary" size="sm">
            Question {currentIdx + 1} of {mockAssessmentQuestions.length}
          </Badge>
          <span className="text-[10px] uppercase font-bold tracking-wide">{currentQuestion.category}</span>
        </div>

        <h2 className="text-base md:text-lg font-bold text-slate-900 tracking-tight leading-snug">
          {currentQuestion.question}
        </h2>

        {/* Question Answers Input Forms */}
        <div className="mt-4 flex flex-col gap-3">
          {currentQuestion.type === "choice" && currentQuestion.options && (
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = answers[currentQuestion.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(currentQuestion.id, opt.value)}
                    className={`w-full p-4 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between group ${
                      isSelected
                        ? "bg-primary-50 border-primary-500 text-primary-700 shadow-sm"
                        : "bg-white border-slate-200/85 hover:bg-slate-50 text-slate-650"
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center text-[10px] shrink-0 ml-3 ${
                      isSelected ? "border-primary-500 bg-primary-500 text-white" : "border-slate-350"
                    }`}>
                      {isSelected && "✓"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {currentQuestion.type === "rating" && (
            <div className="flex flex-col gap-6 py-4 items-center">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((num) => {
                  const isSelected = answers[currentQuestion.id] === num;
                  return (
                    <button
                      key={num}
                      onClick={() => handleRatingChange(currentQuestion.id, num)}
                      className={`h-11 w-11 rounded-xl border font-bold text-sm flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-500/10"
                          : "bg-white border-slate-250 hover:bg-slate-50 text-slate-650"
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>
              <div className="w-full flex justify-between px-2 text-[10px] font-semibold text-slate-450 uppercase tracking-wider">
                <span>{currentQuestion.minLabel}</span>
                <span>{currentQuestion.maxLabel}</span>
              </div>
            </div>
          )}

          {currentQuestion.type === "boolean" && (
            <div className="flex gap-4">
              {["yes", "no"].map((val) => {
                const isSelected = answers[currentQuestion.id] === val;
                return (
                  <button
                    key={val}
                    onClick={() => handleSelectOption(currentQuestion.id, val)}
                    className={`flex-1 p-4 rounded-xl border font-bold text-xs capitalize transition-all ${
                      isSelected
                        ? "bg-primary-50 border-primary-500 text-primary-700 shadow-sm"
                        : "bg-white border-slate-200/85 hover:bg-slate-50 text-slate-650"
                    }`}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </Card>

      {/* Navigation Footer */}
      <div className="flex justify-between mt-2">
        <Button
          variant="ghost"
          disabled={currentIdx === 0}
          onClick={handleBack}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Previous
        </Button>
        {currentIdx < mockAssessmentQuestions.length - 1 ? (
          <Button
            variant="primary"
            onClick={handleNext}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Next Question
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmit}
            rightIcon={<CheckCircle2 className="h-4.5 w-4.5" />}
          >
            Complete Assessment
          </Button>
        )}
      </div>
    </div>
  );
};
export default Assessment;
