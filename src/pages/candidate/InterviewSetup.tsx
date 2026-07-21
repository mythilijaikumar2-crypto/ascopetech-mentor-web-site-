import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useInterviewStore } from "../../store/interviewStore";
import { useProfileStore } from "../../store/profileStore";
import { interviewService } from "../../services/interviewService";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Select } from "../../components/common/Select";
import { mockCareers } from "../../data/careers";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const InterviewSetup: React.FC = () => {
  const { selectedGoal } = useProfileStore();
  const { startSession } = useInterviewStore();
  const navigate = useNavigate();

  // Setup options
  const [roleId, setRoleId] = useState(selectedGoal || mockCareers[0].id);
  const [difficulty, setDifficulty] = useState<"Entry" | "Mid" | "Senior">("Mid");
  const [focus, setFocus] = useState<"Technical" | "Behavioral" | "Mixed">("Mixed");
  const [questionCount, setQuestionCount] = useState("3");
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const career = mockCareers.find((c) => c.id === roleId) || mockCareers[0];
      const count = Number(questionCount) || 3;
      
      const questions = await interviewService.getQuestionsForRole(roleId, count);

      const sessionId = `sess-${Math.random().toString(36).substr(2, 9)}`;
      
      startSession({
        sessionId,
        roleId,
        roleTitle: career.title,
        difficulty,
        focus,
        questions: questions.map((q) => ({ ...q })),
        isCompleted: false
      });

      toast.success("Questions initialized! Practice console loading.");
      navigate(`/candidate/interviews/session/${sessionId}`);
    } catch (err) {
      toast.error("Failed to initialize questions.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 flex flex-col gap-6">
      {/* Header back navigation */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
        <Link to="/candidate/interviews" className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-655 rounded-xl transition-all">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Setup Mock Interview</h1>
          <p className="text-[10px] text-slate-405">Configure parameters for your timed practice session.</p>
        </div>
      </div>

      <Card className="p-8 border-slate-200 bg-white shadow-sm">
        <form onSubmit={handleStart} className="flex flex-col gap-5">
          <div className="flex items-center gap-2 text-indigo-650">
            <Sparkles className="h-5 w-5 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Session Options</h3>
          </div>

          <Select
            label="Target Career Role"
            value={roleId}
            onChange={(e: any) => setRoleId(e.target.value)}
            options={mockCareers.map((c) => ({ value: c.id, label: c.title }))}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Difficulty Level"
              value={difficulty}
              onChange={(e: any) => setDifficulty(e.target.value)}
              options={[
                { value: "Entry", label: "Entry-Level" },
                { value: "Mid", label: "Mid-Level" },
                { value: "Senior", label: "Senior-Level" }
              ]}
            />
            <Select
              label="Question Focus"
              value={focus}
              onChange={(e: any) => setFocus(e.target.value)}
              options={[
                { value: "Technical", label: "Technical Coding" },
                { value: "Behavioral", label: "Behavioral HR" },
                { value: "Mixed", label: "Mixed Questions" }
              ]}
            />
          </div>

          <Select
            label="Number of Questions"
            value={questionCount}
            onChange={(e: any) => setQuestionCount(e.target.value)}
            options={[
              { value: "2", label: "2 Questions (Short session)" },
              { value: "3", label: "3 Questions (Recommended)" },
              { value: "4", label: "4 Questions" },
              { value: "5", label: "5 Questions (Full review)" }
            ]}
          />

          <Button type="submit" variant="primary" isLoading={isLoading} leftIcon={<Play className="h-4.5 w-4.5" />} className="w-full mt-4 justify-center py-3">
            Initialize timed practice console
          </Button>
        </form>
      </Card>
    </div>
  );
};
export default InterviewSetup;
