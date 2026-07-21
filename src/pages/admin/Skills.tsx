import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Award, ArrowLeft } from "lucide-react";

export const SkillsPage: React.FC = () => {
  return (
    <div className="max-w-md flex flex-col gap-6 animate-fade-up">
      <div className="border-b border-slate-200 pb-5">
        <Badge variant="primary">INTEGRATION</Badge>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">Skill Quizzes Control</h1>
      </div>

      <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col items-center text-center gap-4">
        <Award className="h-10 w-10 text-primary-500 animate-pulse" />
        <div>
          <h3 className="text-sm font-bold text-slate-800">Skill Quizzes database is synced</h3>
          <p className="text-xs text-slate-450 mt-1">Quizzes parameters are configured globally. Check candidate matches and activity logs inside the main dashboard.</p>
        </div>
        <Link to="/admin/dashboard" className="w-full">
          <Button variant="primary" className="w-full justify-center" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Back to Dashboard
          </Button>
        </Link>
      </Card>
    </div>
  );
};
export default SkillsPage;
