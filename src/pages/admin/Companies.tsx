import React from "react";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Briefcase, Building2 } from "lucide-react";

export const CompaniesPage: React.FC = () => {
  const companies = [
    { name: "Google", location: "Mountain View, CA", jobCount: 14, industry: "Technology" },
    { name: "Stripe", location: "San Francisco, CA", jobCount: 8, industry: "Fintech" },
    { name: "Airbnb", location: "Remote / SF", jobCount: 5, industry: "Hospitality" },
    { name: "Amazon", location: "Seattle, WA", jobCount: 19, industry: "E-Commerce" }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-up">
      <div className="border-b border-slate-200 pb-5">
        <Badge variant="primary">PARTNERS</Badge>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">Employer Portfolios</h1>
        <p className="text-[10px] text-slate-400">View registered hiring organizations and their active vacancy counts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((c, i) => (
          <Card key={i} className="p-6 border-slate-200 bg-white shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="h-11 w-11 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center text-slate-500">
                <Building2 className="h-5.5 w-5.5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-850 tracking-tight leading-tight">{c.name}</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{c.location} | {c.industry}</p>
              </div>
            </div>
            <Badge variant="primary" className="text-xs font-bold inline-flex items-center gap-1.5 py-1 px-3">
              <Briefcase className="h-3.5 w-3.5" /> {c.jobCount} Jobs
            </Badge>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default CompaniesPage;
