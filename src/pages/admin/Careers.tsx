import React from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { mockCareers } from "../../data/careers";
import { Compass, TrendingUp } from "lucide-react";

export const CareersPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div className="border-b border-slate-200 pb-5">
        <Badge variant="primary">CURRICULUMS</Badge>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">Manage Career Templates</h1>
        <p className="text-[10px] text-slate-400">Audit system career recommendations templates, average salaries, and demands.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockCareers.map((c) => (
          <Card key={c.id} className="p-6 border-slate-200 bg-white shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <Badge variant={c.demand === "High" ? "success" : "warning"}>{c.demand} Demand</Badge>
                <span className="text-[10px] text-slate-400 font-semibold">{c.growthRate} Growth</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 tracking-tight">{c.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{c.category}</p>
                <p className="text-xs text-slate-500 line-clamp-3 mt-2 leading-relaxed">{c.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6">
              <span className="text-xs font-extrabold text-primary-650">{c.salaryRange.avg} Avg</span>
              <span className="text-[10px] text-slate-400 font-semibold inline-flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" /> {c.learningTime} Study
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CareersPage;
