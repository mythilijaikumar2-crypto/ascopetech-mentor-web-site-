import React, { useEffect, useState } from "react";
import { useProfileStore } from "../../store/profileStore";
import { useRoadmapStore } from "../../store/roadmapStore";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Modal } from "../../components/common/Modal";
import { CareerPath } from "../../data/careers";
import { useCareers } from "../../hooks";
import { Compass, CheckCircle2, Target, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const Careers: React.FC = () => {
  const { selectedGoal, setSelectedGoal } = useProfileStore();
  const { loadRoadmap } = useRoadmapStore();
  const { careers } = useCareers();
  
  const [recommendations, setRecommendations] = useState<CareerPath[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("career_ai_recommendations");
    if (saved) {
      setRecommendations(JSON.parse(saved));
    } else if (careers.length > 0) {
      setRecommendations(careers);
    }
  }, [careers]);

  const handleSelectGoal = (careerId: string, careerTitle: string) => {
    setSelectedGoal(careerId);
    loadRoadmap(careerId); // Generate study roadmap
    toast.success(`'${careerTitle}' has been selected as your active target career! Study roadmap initialized.`);
  };

  const handleCompareToggle = (careerId: string) => {
    setCompareIds((prev) => {
      const isIncluded = prev.includes(careerId);
      if (isIncluded) {
        return prev.filter((id) => id !== careerId);
      }
      if (prev.length >= 3) {
        toast.warning("You can compare a maximum of 3 career paths side-by-side.");
        return prev;
      }
      return [...prev, careerId];
    });
  };

  const comparedCareers = mockCareers.filter((c) => compareIds.includes(c.id));

  return (
    <div className="py-8 flex flex-col gap-10">
      
      {/* Header and Compare Toolbar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Badge variant="primary">CAREER RECOMMENDATIONS</Badge>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mt-1.5">
            Your Personalized Career Matches
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
            Compare options side-by-side, analyze demanded skills, and select your target goal.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {compareIds.length > 0 && (
            <Badge variant="secondary" className="px-3 py-1 font-bold">
              {compareIds.length} PATHS SELECTED
            </Badge>
          )}
          <Button
            variant="primary"
            disabled={compareIds.length < 2}
            onClick={() => setIsCompareModalOpen(true)}
          >
            Compare Selected ({compareIds.length})
          </Button>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((career) => {
          const isGoal = selectedGoal === career.id;
          const isCompared = compareIds.includes(career.id);
          
          return (
            <Card
              key={career.id}
              className={`p-6 flex flex-col justify-between min-h-[240px] relative transition-all ${
                isGoal ? "ring-2 ring-primary-650 border-transparent shadow-md" : "border-slate-200/85"
              }`}
            >
              {isGoal && (
                <div className="absolute -top-3 left-6 px-2.5 py-0.8 bg-primary-600 text-white rounded-full text-[9px] font-extrabold tracking-wide uppercase flex items-center gap-1 shadow-sm">
                  <Check className="h-3 w-3" /> ACTIVE GOAL
                </div>
              )}

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <Badge variant={career.demand === "High" ? "success" : "warning"} className="text-[8.5px]">
                    {career.demand} Demand
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-semibold">{career.growthRate}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 tracking-tight leading-snug">{career.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mt-1.5">{career.description}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3.5 border-t border-slate-100 pt-4 mt-6">
                <div className="flex justify-between text-xs">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Average Salary</p>
                    <p className="font-extrabold text-slate-700 mt-0.5">{career.salaryRange.avg}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Duration</p>
                    <p className="font-semibold text-slate-600 mt-0.5">{career.learningTime}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 justify-center py-2"
                    onClick={() => handleCompareToggle(career.id)}
                  >
                    {isCompared ? "Remove Compare" : "Compare"}
                  </Button>
                  <Button
                    variant={isGoal ? "ghost" : "primary"}
                    size="sm"
                    className="flex-1 justify-center py-2"
                    disabled={isGoal}
                    onClick={() => handleSelectGoal(career.id, career.title)}
                  >
                    {isGoal ? "Selected" : "Set Goal"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Comparison Modal */}
      <Modal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        title="Side-by-Side Career Comparison"
        size="3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparedCareers.map((c) => {
            const isGoal = selectedGoal === c.id;
            return (
              <div key={c.id} className="flex flex-col gap-5 border-r last:border-r-0 border-slate-100 pr-0 md:pr-4 last:pr-0">
                <div>
                  <h4 className="text-sm font-bold text-slate-850 tracking-tight leading-tight">{c.title}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold">{c.category}</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider">Salary Details</span>
                  <div className="text-xs bg-slate-50 border border-slate-100/60 p-3 rounded-xl">
                    <p className="font-extrabold text-primary-650 text-base">{c.salaryRange.avg}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Range: {c.salaryRange.min} - {c.salaryRange.max}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider">Learning Estimate</span>
                  <p className="text-xs font-semibold text-slate-700">{c.learningTime}</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider">Growth Indicator</span>
                  <p className="text-xs font-semibold text-emerald-600">{c.growthRate}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-bold text-slate-450 uppercase tracking-wider">Target Skills</span>
                  <div className="flex flex-wrap gap-1">
                    {c.skillsRequired.slice(0, 4).map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-slate-100 text-[10px] rounded-full text-slate-650 font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  variant={isGoal ? "ghost" : "primary"}
                  size="sm"
                  className="w-full justify-center mt-2.5"
                  disabled={isGoal}
                  onClick={() => {
                    handleSelectGoal(c.id, c.title);
                    setIsCompareModalOpen(false);
                  }}
                >
                  {isGoal ? "Active Goal" : "Select as Goal"}
                </Button>
              </div>
            );
          })}
        </div>
      </Modal>

    </div>
  );
};
export default Careers;
