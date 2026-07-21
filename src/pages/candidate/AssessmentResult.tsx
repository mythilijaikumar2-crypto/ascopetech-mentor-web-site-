import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfileStore } from "../../store/profileStore";
import { useRoadmapStore } from "../../store/roadmapStore";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { CareerRecommendation } from "../../services/careerService";
import { Compass, CheckCircle2, ChevronRight, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

export const AssessmentResult: React.FC = () => {
  const [recommendations, setRecommendations] = useState<CareerRecommendation[]>([]);
  const { setSelectedGoal } = useProfileStore();
  const { loadRoadmap } = useRoadmapStore();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("career_ai_recommendations");
    if (data) {
      setRecommendations(JSON.parse(data));
    } else {
      // Fallback redirection if they haven't done quiz yet
      navigate("/candidate/assessment");
    }
  }, [navigate]);

  const handleSelectGoal = (careerId: string, careerTitle: string) => {
    setSelectedGoal(careerId);
    loadRoadmap(careerId); // Generate study roadmap automatically
    
    toast.success(`'${careerTitle}' has been selected as your career goal! Visual roadmap initialized.`);
    navigate("/candidate/dashboard");
  };

  if (recommendations.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-slate-400">Loading analysis results...</p>
      </div>
    );
  }

  const topMatch = recommendations[0];

  return (
    <div className="py-8 flex flex-col gap-10">
      
      {/* Header banner */}
      <div className="bg-gradient-to-br from-primary-600 to-brand-500 text-white rounded-3xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-lg">
          <Badge variant="secondary" className="max-w-fit bg-white/20 border-white/10 text-white font-bold">
            ANALYSIS COMPLETE
          </Badge>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Your Career Match Profile</h1>
          <p className="text-xs opacity-90 leading-relaxed">
            Based on your scenario options, coding experience slider, and preferred work environments, we've computed your affinity scores for different tech roles.
          </p>
        </div>
        <div className="h-16 w-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white shrink-0">
          <Compass className="h-8 w-8 animate-pulse" />
        </div>
      </div>

      {/* Top recommendation showcase */}
      <Card className="p-8 border-slate-200/85 bg-white shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-500" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Top Match Recommended</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">{topMatch.title}</h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">{topMatch.reason}</p>
          </div>
          <div className="text-center bg-slate-50 border border-slate-100 p-4.5 rounded-2xl min-w-32">
            <span className="text-3xl font-extrabold text-primary-650">{topMatch.matchScore}%</span>
            <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">MATCH INDEX</p>
          </div>
        </div>

        {/* Profile traits summaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Your Strong Traits</h3>
            <div className="flex flex-col gap-2 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Excellent logic optimization capabilities</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Thrives in remote collaborative structures</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Focus Skill Gaps</h3>
            <div className="flex flex-col gap-2 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Needs further training in TypeScript interfaces</span>
              </div>
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Learn transition state management structures</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="primary"
            rightIcon={<ChevronRight className="h-4.5 w-4.5" />}
            onClick={() => handleSelectGoal(topMatch.id, topMatch.title)}
          >
            Select as Target Goal & View Dashboard
          </Button>
        </div>
      </Card>

      {/* Alternative Recommendations list */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Alternative Career Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.slice(1, 4).map((rec) => (
            <Card key={rec.id} className="p-6 border-slate-200/85 bg-white shadow-sm flex flex-col justify-between gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 tracking-tight">{rec.title}</h4>
                  <span className="text-[10px] text-slate-450 uppercase font-semibold">{rec.category}</span>
                </div>
                <Badge variant="primary" className="font-extrabold">{rec.matchScore}% Match</Badge>
              </div>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {rec.description}
              </p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span>Growth: {rec.growthRate}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-primary-600 font-bold" onClick={() => handleSelectGoal(rec.id, rec.title)}>
                  Select Goal
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};
export default AssessmentResult;
