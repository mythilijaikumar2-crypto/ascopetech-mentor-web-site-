import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { mockCareers, CareerPath } from "../../data/careers";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { useProfileStore } from "../../store/profileStore";
import { useAuthStore } from "../../store/authStore";
import { ArrowLeft, Compass, CheckCircle2, XCircle, Clock, Target } from "lucide-react";
import { toast } from "sonner";

export const CareerDetails: React.FC = () => {
  const { careerId } = useParams<{ careerId: string }>();
  const [career, setCareer] = useState<CareerPath | null>(null);
  const { setSelectedGoal } = useProfileStore();
  const { isAuthenticated } = useAuthStore();
  
  const navigate = useNavigate();

  useEffect(() => {
    const found = mockCareers.find((c) => c.id === careerId);
    if (found) {
      setCareer(found);
    }
  }, [careerId]);

  const handleSelectGoal = () => {
    if (!career) return;
    if (isAuthenticated) {
      setSelectedGoal(career.id);
      toast.success(`'${career.title}' has been successfully set as your target career goal!`);
      navigate("/candidate/dashboard");
    } else {
      toast.info("Please log in to set this path as your target goal.");
      navigate("/login", { state: { redirectToGoal: career.id } });
    }
  };

  if (!career) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-bold text-slate-800">Career path not found</h2>
        <Link to="/careers" className="text-primary-600 hover:underline mt-2 inline-block">
          Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 bg-slate-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-8">
        
        {/* Back Link */}
        <Link to="/careers" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800">
          <ArrowLeft className="h-4 w-4" /> Back to Careers
        </Link>

        {/* Hero Card */}
        <Card className="p-8 border-slate-100 bg-white shadow-sm flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shadow-sm">
                <Compass className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{career.title}</h1>
                <p className="text-xs text-slate-450">{career.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={career.demand === "High" ? "success" : "warning"}>
                {career.demand} Demand
              </Badge>
              <Badge variant="neutral">{career.growthRate}</Badge>
            </div>
          </div>

          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            {career.descriptionFull}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-slate-100 py-6 my-2">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Average Salary</p>
              <p className="text-xl font-extrabold text-primary-600 mt-1">{career.salaryRange.avg}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Salary Range</p>
              <p className="text-xs font-semibold text-slate-700 mt-2">
                {career.salaryRange.min} - {career.salaryRange.max}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Learning Duration</p>
              <p className="text-xs font-semibold text-slate-700 mt-2 inline-flex items-center gap-1.5 justify-center">
                <Clock className="h-4 w-4 text-slate-400" /> {career.learningTime}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3.5">
            <Button variant="outline" onClick={() => navigate("/careers")}>
              Compare Paths
            </Button>
            <Button variant="primary" leftIcon={<Target className="h-4.5 w-4.5" />} onClick={handleSelectGoal}>
              Select as Goal
            </Button>
          </div>
        </Card>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skills Required */}
          <Card className="p-6 border-slate-100 bg-white shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-3">
              Required Core Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {career.skillsRequired.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1 font-medium">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Pros & Cons */}
          <Card className="p-6 border-slate-100 bg-white shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-3">
              Trade-offs
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Pros</h4>
                {career.pros.map((pro, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 border-t border-slate-50 pt-3">
                <h4 className="text-[11px] font-bold text-red-600 uppercase tracking-wider">Cons</h4>
                {career.cons.map((con, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <XCircle className="h-4 w-4 text-red-450 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
};
export default CareerDetails;
