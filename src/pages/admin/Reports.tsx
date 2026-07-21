import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { FileText, ArrowLeft } from "lucide-react";

export const ReportsPage: React.FC = () => {
  return (
    <div className="max-w-md flex flex-col gap-6 animate-fade-up">
      <div className="border-b border-slate-200 pb-5">
        <Badge variant="primary">INTEGRATION</Badge>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1.5">Reports & Insights</h1>
      </div>

      <Card className="p-6 border-slate-200 bg-white shadow-sm flex flex-col items-center text-center gap-4">
        <FileText className="h-10 w-10 text-primary-500" />
        <div>
          <h3 className="text-sm font-bold text-slate-800">System insights are generated</h3>
          <p className="text-xs text-slate-455 mt-1">Growth stats, registration charts, and match indexes are updated. View graphs inside the main admin dashboard page.</p>
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
export default ReportsPage;
